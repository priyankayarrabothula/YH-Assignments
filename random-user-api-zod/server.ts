import express from "express";
import { z } from "zod";

const app = express();
const PORT = 3000;

app.use(express.json());


// PING ROUTE

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});



// RANDOM PERSON

const RandomUserSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
      location: z.object({
        country: z.string(),
      }),
    })
  ),
});

app.get("/random-person", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const parsed = RandomUserSchema.parse(data);

    const [user] = parsed.results;

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    res.json({
      fullName: `${user.name.first} ${user.name.last}`,
      country: user.location.country,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch random person",
    });
  }
});

 
 //POST USER


const UserSchema = z.object({
  name: z.string().min(3).max(12),
  age: z.number().min(18).max(100).optional().default(28),
  email: z.string().email().toLowerCase(),
});

app.post("/users", (req, res) => {
  try {
    const validatedUser = UserSchema.parse(req.body);

    res.status(201).json(validatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.issues
      });
    }

    res.status(500).json({
      error: "Unexpected error",
    });
  }
});


//CHALLENGE — RANDOM LOGIN


const LoginSchema = z.object({
  results: z.array(
    z.object({
      login: z.object({
        username: z.string(),
      }),
      registered: z.object({
        date: z.string(),
      }),
    })
  ),
});

app.get("/random-login", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const parsed = LoginSchema.parse(data);

    const [user] = parsed.results;

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    const date = user.registered.date.split("T")[0];

    res.json({
      username: user.login.username,
      registeredDate: date,
      summary: `${user.login.username} (registered on ${date})`,
    });
  } catch {
    res.status(500).json({
      error: "Failed to fetch login info",
    });
  }
});


//OPTIONAL — RANDOM ADDRESS

const AddressSchema = z.object({
  results: z.array(
    z.object({
      location: z.object({
        city: z.string(),
        postcode: z.union([z.string(), z.number()]),
      }),
    })
  ),
});

app.get("/random-address", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const parsed = AddressSchema.parse(data);

    const [user] = parsed.results;

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    res.json({
      city: user.location.city,
      postcode: user.location.postcode,
    });
  } catch {
    res.status(500).json({
      error: "Failed to fetch address",
    });
  }
});

//START SERVER

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
# Prisma + Express — UserLanguage API

A REST API built with **Express ** and **Prisma 6** for managing users and their spoken languages.

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run migration (creates the database + UserLanguage table)
npx prisma migrate dev --name create_userlanguage_table

# 3. Seed the database with 15 sample users
npx prisma db seed

# 4. Start the server
npm start
```

The server runs on **http://localhost:3000**.

---

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/userlanguages` | Get all users |
| GET | `/userlanguages/:language` | Get users who speak a specific language |
| POST | `/userlanguages` | Create a new user |
| PUT | `/userlanguages/:email/languages` | Update a user's languages by email |
| DELETE | `/userlanguages/under18` | Delete all users under 18 |

---

## Testing with Postman / curl

### GET all users
```
GET http://localhost:3000/userlanguages
```

### GET users by language
```
GET http://localhost:3000/userlanguages/Spanish
```

### POST new user
```
POST http://localhost:3000/userlanguages
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "languages": ["English", "German"],
  "age": 27
}
```

### PUT update languages
```
PUT http://localhost:3000/userlanguages/jane@example.com/languages
Content-Type: application/json

{
  "languages": ["English", "German", "French"]
}
```

### DELETE users under 18
```
DELETE http://localhost:3000/userlanguages/under18
```
Response: `{ "message": "Deleted 3 user(s) under 18", "deletedCount": 3 }`

---

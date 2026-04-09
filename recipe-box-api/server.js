import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recipe API is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const recipes = [
    { id:1, name:"Classic Pancakes", cuisine:"American", prepTime:"15 min" },

    { id:2, name:"Spaghetti Carbonara", cuisine:"Italian", prepTime:"20 min" },
    
    { id:3, name:"Guacamole", cuisine:"Mexican", prepTime:"10 min" }
]

app.get("/recipes", (req, res) => {

    res.json(recipes);

})

app.post("/recipes", (req, res) => {

    const { name, cuisine, prepTime } = req.body;
    
    const newRecipe = recipes.length > 0 ? { id: recipes[recipes.length - 1].id + 1, name, cuisine, prepTime } : { id: 1, name, cuisine, prepTime };

    recipes.push(newRecipe);

    res.status(201).json(newRecipe);

})

app.get("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
});

app.put("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const { name, cuisine, prepTime } = req.body;

  const recipeIndex = recipes.findIndex((r) => r.id === id);

  if (recipeIndex === -1) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  recipes[recipeIndex] = { ...recipes[recipeIndex], name, cuisine, prepTime };

  res.json(recipes[recipeIndex]);
});

app.delete("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  recipes = recipes.filter(r => r.id !== id);

  res.json({ message: "Recipe deleted successfully", deletedRecipe: recipe });
});
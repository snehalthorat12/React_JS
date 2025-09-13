const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Helper: get meals by single ingredient
async function getMealsByIngredient(ingredient) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
  );
  const data = await res.json();
  return data.meals || [];
}

// API: /api/meals?ingredient=egg,onion&cuisine=Indian
app.get("/api/meals", async (req, res) => {
  let ingredients = (req.query.ingredient || "").trim().split(",").map(i => i.trim());
  let cuisine = (req.query.cuisine || "").trim();

  if (!ingredients.length) return res.status(400).json({ error: "Ingredient is required" });

  try {
    // Fetch meals for each ingredient
    let mealsList = await Promise.all(ingredients.map(getMealsByIngredient));

    // Find intersection (meals that appear in all ingredient lists)
    let intersectedMeals = mealsList.reduce((a, b) => a.filter(m => b.some(x => x.idMeal === m.idMeal)));

    // Filter by cuisine if specified
    if (cuisine) {
      const cuisineRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(cuisine)}`);
      const cuisineData = await cuisineRes.json();
      const cuisineMeals = cuisineData.meals || [];
      const cuisineIds = new Set(cuisineMeals.map(m => m.idMeal));
      intersectedMeals = intersectedMeals.filter(m => cuisineIds.has(m.idMeal));
    }

    res.json({ meals: intersectedMeals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

app.get("/api/meal/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id) return res.status(400).json({ error: "Meal ID is required" });

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    // Check if response is OK
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch meal from API" });
    }

    const data = await response.json();

    // If no meals returned
    if (!data.meals || data.meals.length === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json(data);
  } catch (err) {
    console.error("Error fetching meal details:", err);
    res.status(500).json({ error: "Failed to fetch meal details" });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));

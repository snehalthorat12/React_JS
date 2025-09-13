# 🍳 Recipe Ideas App

## Overview
Recipe Ideas is a web application designed for **Taylor**, a busy professional, to quickly find meals based on available ingredients and optional cuisine preferences. The app fetches recipes from **TheMealDB API** and displays meal details, ingredients, instructions, and YouTube cooking videos.

---

## Features
- Search meals by **ingredient(s)** (e.g., chicken, onion).  
- Optional **cuisine filter** (e.g., Indian, Italian).  
- View **meal details** including:
  - Ingredients and measurements
  - Cooking instructions
  - YouTube video link (if available)
- **Responsive design** using **Bootstrap 5**.  
- **Enter key triggers search** for quick usability.  
- Handles **errors gracefully** (no results, network errors).  

---

## Tech Stack
- **Frontend:** React.js + Bootstrap 5 (via CDN)  
- **Backend:** Node.js + Express.js  
- **API:** [TheMealDB API](https://www.themealdb.com/api.php)  
- **State Management:** React useState hooks  

---

## Installation & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/recipe-ideas-app.git
cd recipe-ideas-app


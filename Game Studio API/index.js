import express from "express";
import pg from "pg";
import dotenv from "dotenv";
const PORT = 3000;

dotenv.config();
const app = express();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

app.use(express.json());

// Task 1: List All Players and Their Scores
app.get("/players-scores", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.name AS player, g.title AS game, s.score
       FROM players p
       JOIN scores s ON p.id = s.player_id
       JOIN games g ON g.id = s.game_id
       ORDER BY p.name, s.score DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 2: Find High Scorers (Top 3 players)
app.get("/top-players", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.name, SUM(s.score) AS total_score
       FROM players p
       JOIN scores s ON p.id = s.player_id
       GROUP BY p.id, p.name
       ORDER BY total_score DESC
       LIMIT 3`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 3: Players Who Didn't Play Any Games
app.get("/inactive-players", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.join_date
       FROM players p
       LEFT JOIN scores s ON p.id = s.player_id
       WHERE s.id IS NULL`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 4: Find Popular Game Genres
app.get("/popular-genres", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT g.genre, COUNT(*) AS times_played
       FROM games g
       JOIN scores s ON g.id = s.game_id
       GROUP BY g.genre
       ORDER BY times_played DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 5: Recently Joined Players (Last 30 days)
app.get("/recent-players", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.join_date
       FROM players p
       WHERE p.join_date >= CURRENT_DATE - INTERVAL '30 days'
       ORDER BY p.join_date DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Players' Favorite Games
app.get("/favorite-games", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.name, g.title, COUNT(*) AS times_played
       FROM players p
       JOIN scores s ON p.id = s.player_id
       JOIN games g ON g.id = s.game_id
       GROUP BY p.name, g.title
       ORDER BY p.name, times_played DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
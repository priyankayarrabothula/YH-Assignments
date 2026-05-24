-- Task1: List All Players and Their Scores 
SELECT p.name AS player, g.title AS game, s.score
FROM players p
JOIN scores s ON p.id = s.player_id
JOIN games g ON g.id = s.game_id;

-- Task2: Find High Scorers 
SELECT p.name, SUM(s.score) AS total_score
FROM players p
JOIN scores s ON p.id = s.player_id
GROUP BY p.name
ORDER BY total_score DESC
LIMIT 3;

-- Task3: Players Who Didn’t Play Any Games 
SELECT p.name
FROM players p
LEFT JOIN scores s ON p.id = s.player_id
WHERE s.id IS NULL;

-- Task4: Find Popular Game Genres 
SELECT g.genre, COUNT(*) AS times_played
FROM games g
JOIN scores s ON g.id = s.game_id
GROUP BY g.genre
ORDER BY times_played DESC;

-- Task5: Recently Joined Players
SELECT *
FROM players
WHERE join_date >= CURRENT_DATE - INTERVAL '30 days';

-- Bonus Task: Players' Favorite Games
SELECT p.name, g.title, COUNT(*) AS times_played
FROM players p
JOIN scores s ON p.id = s.player_id
JOIN games g ON g.id = s.game_id
GROUP BY p.name, g.title
ORDER BY p.name, times_played DESC;
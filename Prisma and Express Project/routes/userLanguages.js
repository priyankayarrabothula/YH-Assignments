const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// ─── GET /userlanguages ──
// Returns all users
router.get('/', async (req, res) => {
  const users = await prisma.userLanguage.findMany();
  res.json(users);
});

// ─── GET /userlanguages/:language ───
// Returns all users who speak a specific language (case-insensitive)
router.get('/:language', async (req, res) => {
  const { language } = req.params;
  // PostgreSQL array contains — has: [value] does exact match
  const users = await prisma.userLanguage.findMany({
    where: {
      languages: {
        has: language,
      },
    },
  });
  res.json(users);
});

// ─── POST /userlanguages ──
// Create a new user  { name, email, languages: string[], age }
router.post('/', async (req, res) => {
  const { name, email, languages, age } = req.body;

  if (!name || !email || !languages || age === undefined) {
    return res.status(400).json({ error: 'name, email, languages, and age are required' });
  }

  const user = await prisma.userLanguage.create({
    data: {
      name,
      email,
      languages: Array.isArray(languages) ? languages : [languages],
      age: Number(age),
    },
  });
  res.status(201).json(user);
});

// ─── PUT /userlanguages/:email/languages ──
// Update languages for a specific user by email  { languages: string[] }
router.put('/:email/languages', async (req, res) => {
  const { email } = req.params;
  const { languages } = req.body;

  if (!languages) {
    return res.status(400).json({ error: 'languages field is required' });
  }

  const user = await prisma.userLanguage.update({
    where: { email },
    data: {
      languages: Array.isArray(languages) ? languages : [languages],
    },
  });
  res.json(user);
});

// ─── DELETE /userlanguages/under18 ──
// Deletes all users under 18 and returns how many were deleted
router.delete('/under18', async (req, res) => {
  const { count } = await prisma.userLanguage.deleteMany({
    where: { age: { lt: 18 } },
  });
  res.json({ message: `Deleted ${count} user(s) under 18`, deletedCount: count });
});

module.exports = router;

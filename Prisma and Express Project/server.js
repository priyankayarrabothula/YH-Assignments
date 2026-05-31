const express = require('express');
const userLanguagesRouter = require('./routes/userLanguages');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/userlanguages', userLanguagesRouter);

// Error handler
app.use((err, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

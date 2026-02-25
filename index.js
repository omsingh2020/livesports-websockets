import express from 'express';
const app = express();
const PORT = 8000;

// Use JSON middleware
app.use(express.json());

// Root GET route that returns a short message
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the LiveSports API!' });
});

// Start server and log URL
app.listen(PORT, () => {``
  console.log(`Server is running on http://localhost:${PORT}`);
});

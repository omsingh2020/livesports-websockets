import express from 'express';
import { matchRouter } from './src/validation/routes/matches.js';

const app = express();
const PORT = 8000;

// Use JSON middleware
app.use(express.json());

// Root GET route that returns a short message
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the LiveSports API!' });
});

app.use('/matches', matchRouter)

// Start server and log URL
app.listen(PORT, () => {``
  console.log(`Server is running on http://localhost:${PORT}`);
});

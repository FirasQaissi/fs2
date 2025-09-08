const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/study_tracker';
const PORT = process.env.PORT || 3000;

// Routes
const authRoutes = require('./routes/auth');

async function start() {
  try {
    await connectToDatabase(MONGODB_URI);
    console.log('MongoDB connected');

    // Middleware
    app.use(cors());

    // Health
    app.get('/health', (req, res) => {
      res.json({ ok: true });
    });

    // Auth
    app.use('/api/auth', authRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();



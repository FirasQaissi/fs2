const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI 
const PORT = process.env.PORT || 3000;
console.log('Connecting to:', MONGODB_URI);
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
      res.json({ ok: 'Success connecting to MongoDB' });
      console.log('Health check successful');
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



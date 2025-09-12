const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const { User } = require('./models');

dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI 
const PORT = process.env.PORT || 3000;
console.log('Connecting to:', MONGODB_URI);
// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

async function start() {
  try {
    await connectToDatabase(MONGODB_URI);
    console.log('MongoDB connected');

    // Ensure role fields exist on all users (idempotent backfill)
    try {
      const [a, b, c] = await Promise.all([
        User.updateMany({ isAdmin: { $exists: false } }, { $set: { isAdmin: false } }),
        User.updateMany({ isBusiness: { $exists: false } }, { $set: { isBusiness: false } }),
        User.updateMany({ isUser: { $exists: false } }, { $set: { isUser: true } }),
      ]);
      console.log('Role backfill complete', {
        isAdminModified: a.modifiedCount,
        isBusinessModified: b.modifiedCount,
        isUserModified: c.modifiedCount,
      });
    } catch (e) {
      console.error('Role backfill failed', e);
    }

    // Middleware
    app.use(cors());

    // Health
    app.get('/health', (req, res) => {
      res.json({ ok: 'Success connecting to mongoDB' });
      console.log('Health check successful');
    });

    // Auth
    app.use('/api/auth', authRoutes);
    
    // Products
    app.use('/api/products', productRoutes);
    

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();



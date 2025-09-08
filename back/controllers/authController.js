const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hash');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';


async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).lean();
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // For now, return basic user info; JWT can be added later
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.json({ user: safeUser, token });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const passwordHash = await hashPassword(password);
    const created = await User.create({ name, email: normalizedEmail, passwordHash });
    const token = jwt.sign({ userId: created._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ user: { _id: created._id, name: created.name, email: created.email }, token });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'Not found' });
    return res.json({ user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

function logout(_req, res) {
  // For stateless JWT, logout is handled client-side by discarding the token
  return res.json({ ok: true });
}

module.exports = { login, register, me, logout };



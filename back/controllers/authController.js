const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hash');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[!@%$#^&*\-_]).{8,}$/;
const ISRAELI_PHONE_REGEX = /^05[0-9]{8}$/;


async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!EMAIL_REGEX.test(String(email))) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).lean();
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await comparePassword(String(password), user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update user login status
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
      isOnline: true
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: !!user.isAdmin,
      isBusiness: !!user.isBusiness,
      isUser: user.isUser !== false,
    };

    return res.json({ user: safeUser, token });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function register(req, res) {
  try {
    const { name, email, password, phone, isBusiness } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (!EMAIL_REGEX.test(String(email))) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!PASSWORD_REGEX.test(String(password))) {
      return res.status(400).json({ message: 'Password must be at least 8 characters and include a special character' });
    }
    if (phone && !ISRAELI_PHONE_REGEX.test(String(phone))) {
      return res.status(400).json({ message: 'Phone must be a valid Israeli mobile number (05XXXXXXXX)' });
    }
    const normalizedEmail = String(email).toLowerCase().trim();
    const normalizedPhone = phone ? String(phone).trim() : '';
    const existing = await User.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const passwordHash = await hashPassword(String(password));
    const created = await User.create({ name, email: normalizedEmail, phone: normalizedPhone, passwordHash, isBusiness: !!isBusiness });
    console.log('✅ USER CREATED:', {
      _id: created._id,
      name: created.name,
      email: created.email,
      phone: created.phone,
      isAdmin: created.isAdmin,
      isBusiness: created.isBusiness
    });
    const token = jwt.sign({ userId: created._id }, JWT_SECRET, { expiresIn: '4h' });
    return res.status(201).json({ user: { _id: created._id, name: created.name, email: created.email, phone: created.phone, isAdmin: !!created.isAdmin, isBusiness: !!created.isBusiness, isUser: created.isUser !== false }, token });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'Not found' });
    return res.json({ user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, isAdmin: !!user.isAdmin, isBusiness: !!user.isBusiness, isUser: user.isUser !== false } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

async function logout(req, res) {
  try {
    // If user is authenticated, mark them as offline
    if (req.user && req.user.id) {
      await User.findByIdAndUpdate(req.user.id, {
        isOnline: false
      });
    }
    // For stateless JWT, logout is handled client-side by discarding the token
    return res.json({ ok: true });
  } catch (error) {
    // Don't fail logout if we can't update status
    return res.json({ ok: true });
  }
}

async function verifyPassword(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).lean();
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await comparePassword(String(password), user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Password verification error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login, register, me, logout, verifyPassword };



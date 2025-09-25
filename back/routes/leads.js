const express = require('express');
const router = express.Router();
const { Lead } = require('../models');

// POST /api/leads
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body || {};
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields: name, email, phone' });
    }

    const doc = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      timestamp: new Date(),
    };

    const saved = await Lead.create(doc);
    console.log('New lead saved:', saved);
    return res.status(201).json({ ok: true, lead: saved });
  } catch (err) {
    console.error('Failed to save lead:', err);
    return res.status(500).json({ error: 'Failed to save lead' });
  }
});

module.exports = router;



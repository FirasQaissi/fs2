const express = require('express');
const { login, register, me, logout, verifyPassword } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', authMiddleware, logout);
router.post('/verify-password', authMiddleware, verifyPassword);
router.get('/me', authMiddleware, me);

module.exports = router;



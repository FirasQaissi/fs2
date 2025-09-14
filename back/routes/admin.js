const express = require('express');
const router = express.Router();
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { 
  listUsers, 
  deleteUser, 
  updateUser, 
  promoteToBusinessAccount, 
  assignTempAdminPrivileges,
  createUser
} = require('../controllers/adminController');

// All routes under /api/admin require auth + admin
router.use(authMiddleware, requireAdmin);

// Users management
router.get('/users', listUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.patch('/users/:id/promote-business', promoteToBusinessAccount);
router.patch('/users/:id/temp-admin', assignTempAdminPrivileges);

module.exports = router;



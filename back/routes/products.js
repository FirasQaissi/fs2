const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { authMiddleware } = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (authentication required)
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;

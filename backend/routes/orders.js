const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder
} = require('../controllers/orderController');

// Public routes
router.post('/', createOrder);

// Protected routes (require authentication)
router.get('/:id', auth, getOrderById);
router.patch('/:id/payment', auth, updatePaymentStatus);

// Admin only routes
router.get('/', adminAuth, getAllOrders);
router.patch('/:id/status', adminAuth, updateOrderStatus);
router.delete('/:id', adminAuth, deleteOrder);

module.exports = router; 
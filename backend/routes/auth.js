const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get('/me', auth, (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role
        }
    });
});

// Admin only routes
router.post('/admin/register', adminAuth, register);

module.exports = router; 
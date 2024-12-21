const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getAllUsers, deleteUser } = require('../controllers/userController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// Sign up route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Update user route
router.put('/update', protect, updateUser);

// Get all users (only for admins)
router.get('/all', protect, admin, getAllUsers);

// Delete user route (only for admins)
router.delete('/delete/:id', protect, admin, deleteUser);

module.exports = router;

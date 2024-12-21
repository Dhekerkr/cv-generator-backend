const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Respond with user data (excluding password)
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Log in an existing user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Respond with user data and token
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user details (name, email, and password)
const updateUser = async (req, res) => {
    const { userId, name, email, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If newPassword is provided, hash it
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // If name or email is provided, update those fields
        if (name) user.name = name;
        if (email) user.email = email;

        // Save the updated user
        await user.save();

        // Respond with updated user data (excluding password)
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all users (for admin only)
const getAllUsers = async (req, res) => {
    try {
        // Check if the logged-in user is an admin
        const adminUser = await User.findById(req.user);
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Fetch all users excluding passwords
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a user (for admin only)
const deleteUser = async (req, res) => {
    try {
        // Check if the logged-in user is an admin
        const adminUser = await User.findById(req.user);
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Find and delete the user by ID
        const userToDelete = await User.findByIdAndDelete(req.params.id);
        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getAllUsers,
    deleteUser,
};

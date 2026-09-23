const express = require('express');
const router = express.Router();
const User = require('../models/User'); // আপনার User Model এর সঠিক পাথ মিলিয়ে নেবেন

// 1. REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      phone,
      password,
      role: 'customer' // By default customer
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADMIN LOGIN ROUTE
router.post('/admin-login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied: You are not an Admin!" });
    }

    res.json({
      token: "admin-secret-token",
      user: { id: user._id, phone: user.phone, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
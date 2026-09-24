const express = require('express');
const router = express.Router();
const User = require('../models/User'); // আপনার User Model-এর সঠিক পাথ মিলিয়ে নেবেন

// 1. CUSTOMER REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this phone number" });
    }

    const newUser = new User({
      name,
      phone,
      password,
      role: 'customer' // By default customer role
    });

    await newUser.save();

    res.status(201).json({ 
      token: "user-secret-jwt-token",
      user: { id: newUser._id, name: newUser.name, phone: newUser.phone, role: newUser.role },
      message: "Account created successfully" 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. CUSTOMER LOGIN ROUTE (ফ্রন্টএন্ড AuthModal-এর জন্য)
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid phone number or password" });
    }

    res.json({
      token: "user-secret-jwt-token",
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. ADMIN LOGIN ROUTE (অ্যাডমিন পোর্টালের জন্য)
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
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
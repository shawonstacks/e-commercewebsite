const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get All Orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Order
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, items, totalAmount } = req.body;

    const newOrder = new Order({
      customerName,
      phone,
      address,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// সব প্রোডাক্ট পাওয়া (GET)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// নতুন প্রোডাক্ট যোগ করা (POST)
router.post('/', async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;
  try {
    const newProduct = new Product({ name, price, description, category, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// প্রোডাক্ট এডিট/আপডেট করা (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// প্রোডাক্ট ডিলিট করা (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Multer দিয়ে ছবি রাখার জায়গা এবং ফাইলের নাম সেটআপ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ছবি 'uploads' ফোল্ডারে সেভ হবে
  },
  filename: (req, file, cb) => {
    // ইমেজের নাম ইউনিক রাখার জন্য টাইমস্ট্যাম্প যোগ করা হলো
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// সব প্রোডাক্ট পাওয়া (GET)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// নতুন প্রোডাক্ট যোগ করা - সরাসরি ফাইল আপলোডসহ (POST)
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;
  
  // যদি সরাসরি ছবি ফাইল আপলোড করা হয়, তবে তার লোকাল লিঙ্ক তৈরি হবে
  // আর যদি ফাইল না দিয়ে লিঙ্ক (URL) দেওয়া হয়, তবে আগের মতো লিঙ্কটিই নিবে
  let finalImageUrl = imageUrl;
  if (req.file) {
    finalImageUrl = `http://${req.get('host')}/uploads/${req.file.filename}`;
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      imageUrl: finalImageUrl
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// প্রোডাক্ট এডিট/আপডেট করা (PUT)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    // এডিট করার সময় নতুন ছবি দিলে সেটি আপডেট হবে
    if (req.file) {
      updateData.imageUrl = `http://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
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
const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const uploadDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const getImageUrl = (req, fallbackUrl) => {
  if (req.file) {
    return `http://${req.headers.host}/uploads/${req.file.filename}`;
  }

  const bodyImage = req.body?.image || req.body?.imageUrl;
  if (typeof bodyImage === 'string' && bodyImage.trim() !== '') {
    return bodyImage;
  }

  return fallbackUrl;
};

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Create Product with Image File Upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, costPrice, category, stock } = req.body;

    const imageUrl = getImageUrl(req, 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600');

    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      costPrice: Number(costPrice) || 0,
      category,
      imageUrl,
      stock: Number(stock) || 0
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

module.exports = router;
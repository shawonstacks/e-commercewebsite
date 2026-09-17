const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const app = express();

// Middleware (Explicit CORS Config with Allowed Headers)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));

// Base64 ইমেজের পেলোড সাইজ ৫০০ মেগাবাইটে বাড়ানো হলো (Unlimited/High Capacity Support)
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Static Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://e-commerce-db:27017/moss-wanderer';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/auth');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('Moss Wanderer API is up and running!');
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // path মডিউল যুক্ত করা হয়েছে
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Uploads ফোল্ডারটিকে Static করা হলো (যাতে ব্রাউজারে ছবি দেখা যায়)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moss-wanderer')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
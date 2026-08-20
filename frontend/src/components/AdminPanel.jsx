import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';

export default function AdminPanel({ onBack }) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Terrarium',
    description: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // FormData তৈরি করা হচ্ছে ফাইল পাঠানোর জন্য
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (file) {
      data.append('image', file);
    }

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully!');
      setFormData({ name: '', price: '', category: 'Terrarium', description: '' });
      setFile(null);
      fetchProducts(); // নতুন প্রোডাক্ট শো করার জন্য
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1411] text-stone-200 p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="bg-[#141f1a] border border-emerald-900/40 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-emerald-100 mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-stone-400 block mb-1">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange} 
                  placeholder="e.g. Forest Moss Terrarium" 
                  className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Price (৳)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price}
                    onChange={handleInputChange} 
                    placeholder="1500" 
                    className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Category</label>
                  <input 
                    type="text" 
                    name="category" 
                    value={formData.category}
                    onChange={handleInputChange} 
                    placeholder="Terrarium" 
                    className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                    required 
                  />
                </div>
              </div>

              {/* সরাসরি ছবি ফাইল চুজ করার বাটন */}
              <div>
                <label className="text-xs text-stone-400 block mb-1">Product Image (Select from PC)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-2.5 text-xs text-stone-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-800 file:text-emerald-100 hover:file:bg-emerald-700 cursor-pointer"
                  required 
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange} 
                  placeholder="Product description..." 
                  rows="3"
                  className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold p-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 bg-[#141f1a] border border-emerald-900/40 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-emerald-100 mb-4">All Products ({products.length})</h3>
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 bg-[#0d1411] rounded-xl border border-emerald-900/30">
                  <div className="flex items-center gap-3">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-sm text-emerald-50">{product.name}</h4>
                      <p className="text-xs text-stone-400">৳ {product.price} • {product.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
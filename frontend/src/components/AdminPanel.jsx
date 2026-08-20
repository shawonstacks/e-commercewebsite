import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Plus, Trash2, ShoppingBag, Package } from 'lucide-react';

export default function AdminPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState('orders'); // Default Tab 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Terrarium',
    description: ''
  });
  const [file, setFile] = useState(null);

  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders`);
      setOrders(res.data);
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
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (file) {
      data.append('image', file);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/products`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully!');
      setFormData({ name: '', price: '', category: 'Terrarium', description: '' });
      setFile(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    return url.replace('localhost', window.location.hostname);
  };

  return (
    <div className="min-h-screen bg-[#0d1411] text-stone-200 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </button>
          
          <h2 className="text-xl font-bold text-emerald-100">Admin Dashboard</h2>
        </div>

        {/* Tabs Switcher */}
        <div className="flex gap-4 mb-6 border-b border-emerald-900/40 pb-3">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'orders' ? 'bg-emerald-500 text-stone-950' : 'bg-[#141f1a] text-stone-400'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Customer Orders ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'products' ? 'bg-emerald-500 text-stone-950' : 'bg-[#141f1a] text-stone-400'}`}
          >
            <Package className="w-4 h-4" /> Manage Products ({products.length})
          </button>
        </div>

        {/* Tab 1: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-[#141f1a] border border-emerald-900/40 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-emerald-100 mb-4">Received Orders</h3>
            
            {orders.length === 0 ? (
              <p className="text-stone-400 text-sm">No orders received yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-[#0d1411] border border-emerald-900/50 p-4 rounded-xl flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-300">{order.customerName}</span>
                        <span className="text-xs text-stone-500">• {new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1">📞 {order.phone}</p>
                      <p className="text-xs text-stone-400 mt-0.5">📍 {order.address}</p>
                      
                      {/* Items */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <span key={index} className="text-[11px] bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-800/40">
                            {item.name} x {item.quantity} (৳{item.price})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between md:items-end items-center border-t md:border-t-0 border-stone-800 pt-2 md:pt-0">
                      <span className="text-xs text-stone-400">Total Amount</span>
                      <span className="text-lg font-bold text-emerald-400">৳ {order.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: MANAGE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    placeholder="Forest Terrarium" 
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
                      placeholder="1200" 
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

                <div>
                  <label className="text-xs text-stone-400 block mb-1">Product Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange} 
                    className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-2 text-xs text-stone-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-800 file:text-emerald-100 hover:file:bg-emerald-700 cursor-pointer"
                    required 
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange} 
                    placeholder="Description..." 
                    rows="3"
                    className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold p-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-[#141f1a] border border-emerald-900/40 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-emerald-100 mb-4">All Products ({products.length})</h3>
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product._id} className="flex items-center justify-between p-3 bg-[#0d1411] rounded-xl border border-emerald-900/30">
                    <div className="flex items-center gap-3">
                      <img src={getImageUrl(product.imageUrl)} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
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
        )}

      </div>
    </div>
  );
}
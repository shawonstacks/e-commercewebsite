import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  LogOut, LayoutDashboard, Package, ShoppingBag, Plus, Trash2, ArrowLeft, User, Leaf
} from 'lucide-react';

const API_BASE_URL = `http://${window.location.hostname}:5000`;

// ==========================================
// 1. PREMIUM ADMIN LOGIN COMPONENT
// ==========================================
function AdminLogin({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (isSignUp) {
      if (!name || !phone || !password) {
        setError('Please fill in all fields!');
        return;
      }

      try {
        await axios.post(`${API_BASE_URL}/api/auth/register`, { name, phone, password });
        setSuccessMsg('Customer account created successfully!');
        
        setTimeout(() => {
          setIsSignUp(false);
          setSuccessMsg('Please sign in with Admin credentials.');
        }, 1500);
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed!');
      }

    } else {
      const isDefaultAdmin = phone === '01772818573' && password === 'admin';

      if (isDefaultAdmin) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ name: 'Admin', phone: '01772818573', role: 'admin' }));
        if (onLoginSuccess) onLoginSuccess();
        else window.location.reload();
      } else {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/auth/admin-login`, { phone, password });
          
          if (res.data && res.data.user) {
            if (res.data.user.role !== 'admin') {
              setError('Access Denied: You are not authorized as an Admin!');
              return;
            }

            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify(res.data.user));
            if (onLoginSuccess) onLoginSuccess();
            else window.location.reload();
          }
        } catch (err) {
          setError(err.response?.data?.message || 'Invalid admin credentials!');
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
        
        {/* Left Banner */}
        <div className="bg-emerald-950 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              The Moss Wanderer
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-emerald-50 mb-4">
              {isSignUp ? "Join Our Community." : "Admin Control Center."}
            </h1>
            
            <p className="text-emerald-200/70 text-xs leading-relaxed">
              {isSignUp
                ? "Create an account to manage your orders and explore handcrafted terrariums."
                : "Manage inventory, track customer orders, and update products with full store authority."}
            </p>
          </div>

          <div className="pt-8 border-t border-emerald-900/80 text-[11px] text-emerald-400/80 font-medium">
            &copy; {new Date().getFullYear()} The Moss Wanderer. All rights reserved.
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isSignUp ? 'Fill in your information' : 'Sign in to access admin panel'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  required
                  placeholder="017xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 transition duration-200"
            >
              <span>{isSignUp ? 'Register' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              {isSignUp ? "Already have an account?" : "Need a customer account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccessMsg('');
                }}
                className="text-emerald-700 font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN ADMIN DASHBOARD COMPONENT
// ==========================================
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('Terrarium');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, orderRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/products`),
        axios.get(`${API_BASE_URL}/api/orders`)
      ]);
      setProducts(prodRes.data || []);
      setOrders(orderRes.data || []);
    } catch (err) {
      console.error('Error fetching data from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (auth === 'true' && currentUser.role === 'admin') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      localStorage.removeItem('isAdminAuthenticated');
      localStorage.removeItem('currentUser');
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productName || !productPrice) {
      alert('Please enter Product Name and Price!');
      return;
    }

    if (!productImage) {
      alert('Please select an image for the product!');
      return;
    }

    const newProductPayload = {
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription || '',
      stock: 0,
      image: productImage,
      imageUrl: productImage
    };

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/products`, newProductPayload, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Product added successfully!');

      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductImage('');
      e.target.reset();

      fetchData();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to save product to database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const targetId = product._id || product.id;

    if (!targetId) {
      alert('Error: Product Database ID not found!');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete "${product.name}"?`)) {
      try {
        setLoading(true);
        const res = await axios.delete(`${API_BASE_URL}/api/products/${targetId}`);
        
        if (res.status === 200 || res.status === 204) {
          await fetchData();
          alert('Product permanently deleted from database!');
        } else {
          alert('Backend failed to delete the product.');
        }
      } catch (err) {
        console.error('Error deleting product from server:', err);
        alert(`Failed to delete product from database: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await axios.patch(`${API_BASE_URL}/api/orders/${orderId}/status`, { status: newStatus });
      await fetchData();
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (imgData) => {
    if (!imgData || typeof imgData !== 'string' || imgData.trim() === '') {
      return "https://via.placeholder.com/150?text=No+Image";
    }
    return imgData;
  };

  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount || order.total) || 0), 0);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Processing':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => { setIsAuthenticated(true); fetchData(); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-semibold bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Store
          </button>
          
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('orders'); fetchData(); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Orders ({totalOrdersCount})
            </button>
            <button
              onClick={() => { setActiveTab('products'); fetchData(); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Products ({activeProductsCount})
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); fetchData(); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Overview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-800 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/60">
            Admin Portal
          </span>
          <button
            onClick={handleLogout}
            className="p-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200/60 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
        
        {loading && <div className="text-xs text-emerald-700 font-semibold mb-4 text-center animate-pulse">Syncing database...</div>}

        {/* VIEW 1: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Customer Orders ({orders.length})</h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No customer orders received in database yet.
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord, idx) => (
                  <div key={ord._id || ord.id || idx} className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 transition">
                    <div>
                      <span className="font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">
                        #{ord._id ? ord._id.slice(-6) : ord.id || idx + 1}
                      </span>
                      <p className="text-slate-800 font-bold mt-2">Customer: {ord.customerName || ord.name || 'Guest'}</p>
                      <p className="text-slate-600">Phone: {ord.phone || 'N/A'}</p>
                      <p className="text-slate-500 text-[11px]">Address: {ord.shippingAddress || ord.address || 'N/A'}</p>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <p className="font-extrabold text-slate-900 text-sm">৳ {ord.totalAmount || ord.total || 0}</p>
                      
                      <select
                        value={ord.status || 'Pending'}
                        onChange={(e) => handleStatusChange(ord._id || ord.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${getStatusBadgeStyle(ord.status || 'Pending')}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: MANAGE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form: Add New Product */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-5">Add New Product</h3>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Forest Terrarium"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 font-semibold mb-1">Price (৳)</label>
                    <input
                      type="number"
                      required
                      placeholder="1200"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 font-semibold mb-1">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    >
                      <option value="Terrarium">Terrarium</option>
                      <option value="Moss Craft">Moss Craft</option>
                      <option value="Plants">Plants</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="w-full text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-800 file:text-white hover:file:bg-emerald-900 cursor-pointer"
                  />
                  {productImage && (
                    <div className="mt-2.5 flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <img src={productImage} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-emerald-600" />
                      <span className="text-[11px] text-emerald-800 font-semibold">Image Loaded!</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Description..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Add Product'}</span>
                </button>
              </form>
            </div>

            {/* Product List */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">All Products ({products.length})</h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {products.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">No products added in database yet.</p>
                ) : (
                  products.map((item) => (
                    <div 
                      key={item._id || item.id}
                      className="bg-slate-50/70 border border-slate-200/80 p-3 rounded-xl flex items-center justify-between gap-4 transition hover:border-slate-300"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={getImageSrc(item.image || item.imageUrl)} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150?text=Error";
                          }}
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                          <p className="text-[11px] text-slate-500">৳ {item.price} • {item.category || 'Terrarium'}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(item)}
                        className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 3: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-slate-900">Overview Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1">Total Orders</p>
                <h3 className="text-3xl font-extrabold text-emerald-800">{totalOrdersCount}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1">Active Products</p>
                <h3 className="text-3xl font-extrabold text-emerald-800">{activeProductsCount}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1">Total Revenue</p>
                <h3 className="text-3xl font-extrabold text-emerald-800">৳ {totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
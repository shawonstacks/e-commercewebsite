import React, { useState, useEffect } from 'react';
import { 
  Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  LogOut, LayoutDashboard, Package, ShoppingBag, Users, Search, Bell, Plus, Trash2, ArrowLeft, User
} from 'lucide-react';

// ==========================================
// 1. ADMIN / USER LOGIN & SIGN UP COMPONENT
// ==========================================
function AdminLogin({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (isSignUp) {
      if (!name || !phone || !password) {
        setError('Please fill in all fields!');
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some((u) => u.phone === phone);
      
      if (userExists) {
        setError('This phone number is already registered!');
        return;
      }

      const newUser = { name, phone, password, role: 'user' };
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      setSuccessMsg('Account created successfully! Signing in...');
      
      setTimeout(() => {
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.reload();
        }
      }, 1000);

    } else {
      const isDefaultAdmin = phone === '01772818573' && password === 'admin';
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = registeredUsers.find((u) => u.phone === phone && u.password === password);

      if (isDefaultAdmin || foundUser) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem(
          'currentUser',
          JSON.stringify(foundUser || { name: 'Admin', phone: '01772818573', role: 'admin' })
        );
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.reload();
        }
      } else {
        setError('Invalid phone number or password!');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfbfa] text-stone-800 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            The Moss Wanderer Portal
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            {isSignUp ? "Create an account and get started with us." : "Sign in with phone number and continue where you left off."}
          </h1>
          
          <p className="text-stone-500 text-sm leading-relaxed">
            {isSignUp
              ? "Register your account to manage orders, explore custom terrariums, and enjoy exclusive botanical features."
              : "Secure access allows you to manage products, monitor orders, and control store inventory seamlessly."}
          </p>
        </div>

        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-200/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-stone-900 mb-1">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-stone-500">
              {isSignUp ? 'Fill in your details to sign up' : 'Sign in with your phone number and password'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-xl text-center font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition duration-200 mt-2"
            >
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-stone-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccessMsg('');
                }}
                className="text-emerald-600 font-bold hover:underline ml-1"
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
  const [activeTab, setActiveTab] = useState('products'); // Default to products view as requested

  // States for products and orders
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Form states for adding product
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('Terrarium');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    // Load initial data from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Default mock products if empty
    if (savedProducts.length === 0) {
      const initialProducts = [
        { id: 1, name: 'Geometric Form', price: 2500, category: 'Terrarium', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=300' },
        { id: 2, name: 'Mini Ecosystem Terrarium', price: 2000, category: 'Terrarium', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300' },
        { id: 3, name: 'Terrarium Glass', price: 3000, category: 'Terrarium', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300' },
        { id: 4, name: 'Mini Ecosystem-2', price: 2000, category: 'Terrarium', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300' },
      ];
      localStorage.setItem('products', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    } else {
      setProducts(savedProducts);
    }

    setOrders(savedOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
  };

  // Image Upload Handler
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

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !productPrice) return;

    const newProd = {
      id: Date.now(),
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription,
      image: productImage || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=300'
    };

    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));

    // Reset Form
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImage('');
    alert('Product added successfully!');
  };

  // Delete Product Handler
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
    }
  };

  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#070d0a] text-stone-100 font-sans flex flex-col">
      
      {/* Top Header */}
      <header className="border-b border-emerald-950/60 bg-[#0a120e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-semibold bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-900/40 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Store
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-stone-950'
                  : 'bg-[#121d18] text-stone-300 border border-emerald-900/40 hover:bg-emerald-950/50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Customer Orders ({totalOrdersCount})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-emerald-600 text-stone-950'
                  : 'bg-[#121d18] text-stone-300 border border-emerald-900/40 hover:bg-emerald-950/50'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Manage Products ({activeProductsCount})
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-stone-950'
                  : 'bg-[#121d18] text-stone-300 border border-emerald-900/40 hover:bg-emerald-950/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard Overview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold text-stone-200">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="p-2 text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 rounded-lg border border-red-900/40 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
        
        {/* VIEW 1: MANAGE PRODUCTS (Matching your design screenshot) */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form: Add New Product */}
            <div className="lg:col-span-5 bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-stone-100 mb-5">Add New Product</h3>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-400 font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Forest Terrarium"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 font-semibold mb-1">Price (৳)</label>
                    <input
                      type="number"
                      required
                      placeholder="1200"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 font-semibold mb-1">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Terrarium">Terrarium</option>
                      <option value="Moss Craft">Moss Craft</option>
                      <option value="Plants">Plants</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 font-semibold mb-1">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-xs text-stone-400 bg-[#121f19] border border-emerald-900/50 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-stone-950 hover:file:bg-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 font-semibold mb-1">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Description..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </form>
            </div>

            {/* Right Side: Product List */}
            <div className="lg:col-span-7 bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-stone-100">All Products ({products.length})</h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {products.length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-8">No products added yet.</p>
                ) : (
                  products.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-[#121f19] border border-emerald-900/30 p-3 rounded-xl flex items-center justify-between gap-4 transition hover:border-emerald-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded-lg border border-emerald-900/50"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-200">{item.name}</h4>
                          <p className="text-[11px] text-stone-400">৳ {item.price} • {item.category}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="text-stone-500 hover:text-red-400 p-2 rounded-lg transition"
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

        {/* VIEW 2: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-stone-100">Customer Orders ({orders.length})</h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                No customer orders received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord, idx) => (
                  <div key={idx} className="bg-[#121f19] border border-emerald-900/30 p-4 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-emerald-400">Order #{ord.id || idx + 1}</p>
                      <p className="text-stone-300">Customer: {ord.customerName || 'Guest'}</p>
                      <p className="text-stone-400">Phone: {ord.phone || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-100">৳ {ord.total || 0}</p>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                        {ord.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-emerald-100">Overview Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0d1612] p-6 rounded-2xl border border-emerald-900/40">
                <p className="text-xs text-stone-400 font-semibold mb-1">Total Orders</p>
                <h3 className="text-3xl font-black text-emerald-400">{totalOrdersCount}</h3>
              </div>
              <div className="bg-[#0d1612] p-6 rounded-2xl border border-emerald-900/40">
                <p className="text-xs text-stone-400 font-semibold mb-1">Active Products</p>
                <h3 className="text-3xl font-black text-emerald-400">{activeProductsCount}</h3>
              </div>
              <div className="bg-[#0d1612] p-6 rounded-2xl border border-emerald-900/40">
                <p className="text-xs text-stone-400 font-semibold mb-1">Total Revenue</p>
                <h3 className="text-3xl font-black text-emerald-400">৳ {totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  LogOut, LayoutDashboard, Package, ShoppingBag, Plus, Trash2, ArrowLeft, User, 
  Search, Filter, AlertTriangle, Sparkles, CheckCircle2, Clock, XCircle, Store
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
    <div className="min-h-screen w-full bg-stone-100 text-slate-800 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl border border-stone-200/80 shadow-2xl overflow-hidden">
        
        {/* Left Banner */}
        <div className="bg-[#0b1f16] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
          
          <div>
            <div 
              className="flex flex-col items-center justify-center text-center cursor-pointer mb-8 w-full" 
              onClick={() => window.location.href = '/'}
            >
              <div className="w-9 h-9 mb-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 12 C 22 25, 18 68, 50 88 C 48 60, 46 32, 50 12 Z" fill="#104f37" />
                  <path d="M50 12 C 78 25, 82 68, 50 88 C 52 60, 54 32, 50 12 Z" fill="#8da385" />
                  <path d="M 50 35 Q 36 32, 30 28 M 50 50 Q 34 46, 26 40 M 50 65 Q 36 60, 28 52 M 50 78 Q 40 73, 34 66" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 50 35 Q 64 32, 70 28 M 50 50 Q 66 46, 74 40 M 50 65 Q 64 60, 72 52 M 50 78 Q 60 73, 66 66" stroke="#104f37" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M50 12 L 50 94" stroke="#104f37" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              <span className="font-extrabold text-xs tracking-[0.2em] text-emerald-100 uppercase whitespace-nowrap leading-none mb-1.5">
                THE MOSS WANDERER
              </span>

              <div className="flex items-center justify-center gap-2 w-full">
                <span className="h-[1px] bg-emerald-400/50 w-5"></span>
                <span className="text-[8px] font-bold tracking-[0.18em] text-emerald-300 uppercase whitespace-nowrap leading-none">
                  NATURE CONTAINED
                </span>
                <span className="h-[1px] bg-emerald-400/50 w-5"></span>
              </div>
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

          <div className="pt-8 border-t border-emerald-900/80 text-[11px] text-emerald-400/80 font-medium text-center">
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
// 2. ENHANCED MAIN ADMIN DASHBOARD COMPONENT
// ==========================================
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form States
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('Terrarium');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, orderRes, customRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/products`),
        axios.get(`${API_BASE_URL}/api/orders`),
        axios.get(`${API_BASE_URL}/api/custom-enquiries`).catch(() => ({ data: [] }))
      ]);
      setProducts(prodRes.data || []);
      setOrders(orderRes.data || []);
      setEnquiries(customRes.data || []);
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
      stock: 10,
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

  // Metrics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => (o.status || 'Pending') === 'Pending').length;
  const activeProductsCount = products.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount || order.total) || 0), 0);

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const name = (ord.customerName || ord.name || '').toLowerCase();
    const phone = (ord.phone || '').toLowerCase();
    const id = (ord._id || ord.id || '').toLowerCase();
    const matchSearch = name.includes(orderSearch.toLowerCase()) || phone.includes(orderSearch.toLowerCase()) || id.includes(orderSearch.toLowerCase());
    
    const status = ord.status || 'Pending';
    const matchStatus = statusFilter === 'All' || status === statusFilter;
    
    return matchSearch && matchStatus;
  });

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Processing':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => { setIsAuthenticated(true); fetchData(); }} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans flex">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0a1711] text-stone-300 flex flex-col justify-between p-4 min-h-screen border-r border-stone-800 sticky top-0 h-screen shrink-0">
        <div className="space-y-6">
          
          {/* BRAND LOGO CARD */}
          <div 
            className="bg-[#f2f1ea] p-4 rounded-2xl shadow-inner text-center font-sans border border-stone-300/80 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <div className="flex justify-center mb-1.5">
              <div className="w-7 h-7">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 12 C 22 25, 18 68, 50 88 C 48 60, 46 32, 50 12 Z" fill="#1f382b" />
                  <path d="M50 12 C 78 25, 82 68, 50 88 C 52 60, 54 32, 50 12 Z" fill="#8da385" />
                  <path d="M 50 35 Q 36 32, 30 28 M 50 50 Q 34 46, 26 40 M 50 65 Q 36 60, 28 52 M 50 78 Q 40 73, 34 66" stroke="#f2f1ea" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 50 35 Q 64 32, 70 28 M 50 50 Q 66 46, 74 40 M 50 65 Q 64 60, 72 52 M 50 78 Q 60 73, 66 66" stroke="#1f382b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M50 12 L 50 94" stroke="#1f382b" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <h1 className="text-[11px] font-black tracking-[0.18em] uppercase text-[#0d0d0d] leading-none mb-1.5">
              THE MOSS WANDERER
            </h1>

            <div className="flex items-center justify-center gap-1 text-[#1f382b]">
              <span className="h-[1px] w-3 bg-[#1f382b]/80"></span>
              <span className="text-[7px] font-extrabold tracking-[0.15em] uppercase">
                ADMIN PORTAL
              </span>
              <span className="h-[1px] w-3 bg-[#1f382b]/80"></span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab('orders'); fetchData(); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'orders' ? 'bg-emerald-800 text-white' : 'bg-stone-800 text-stone-400'
              }`}>
                {totalOrdersCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('products'); fetchData(); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'products'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Products & Inventory</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'products' ? 'bg-emerald-800 text-white' : 'bg-stone-800 text-stone-400'
              }`}>
                {activeProductsCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('custom'); fetchData(); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'custom'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Custom Enquiries</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'custom' ? 'bg-emerald-800 text-white' : 'bg-stone-800 text-stone-400'
              }`}>
                {enquiries.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); fetchData(); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </button>
          </nav>
        </div>

        {/* Bottom Bar Actions */}
        <div className="space-y-1.5 pt-4 border-t border-stone-800">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition"
          >
            <Store className="w-4 h-4" />
            <span>Back to Main Store</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* RIGHT CONTENT WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-base font-bold text-stone-900 capitalize flex items-center gap-2">
              <span>{activeTab === 'custom' ? 'Custom Enquiries' : `${activeTab} Management`}</span>
              {loading && <span className="text-[11px] text-emerald-700 font-semibold animate-pulse">(Updating...)</span>}
            </h1>
            <p className="text-xs text-stone-500">Real-time control center for The Moss Wanderer</p>
          </div>

          <div className="flex items-center gap-3">
            {pendingOrdersCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {pendingOrdersCount} Pending Orders
              </span>
            )}

            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-extrabold text-emerald-900 text-xs">
              A
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          
          {/* TAB 1: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, order ID..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  <Filter className="w-4 h-4 text-emerald-700 shrink-0 mr-1" />
                  {['All', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        statusFilter === st
                          ? 'bg-emerald-800 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List Container */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="text-sm font-bold text-stone-900">
                    Customer Orders ({filteredOrders.length})
                  </h3>
                  <span className="text-xs text-stone-400">Total in Database: {orders.length}</span>
                </div>
                
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 text-stone-400 text-xs">
                    No orders matching your query or status filter.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((ord, idx) => (
                      <div 
                        key={ord._id || ord.id || idx} 
                        className="bg-stone-50/70 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-600/40 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-900 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded text-[11px]">
                              #ORD-{(ord._id ? ord._id.slice(-6) : (ord.id || idx + 1)).toUpperCase()}
                            </span>
                            <span className="text-[10px] text-stone-400 font-medium">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-stone-900 font-bold text-xs mt-1">
                            Customer: {ord.customerName || ord.name || 'Guest Customer'}
                          </p>
                          <p className="text-stone-600 text-xs">Phone: {ord.phone || 'N/A'}</p>
                          <p className="text-stone-500 text-[11px]">
                            Shipping Address: {ord.shippingAddress || ord.address || 'N/A'}
                          </p>
                        </div>
                        
                        <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200">
                          <p className="font-extrabold text-stone-900 text-base">
                            ৳ {(Number(ord.totalAmount || ord.total) || 0).toLocaleString()}
                          </p>
                          
                          <select
                            value={ord.status || 'Pending'}
                            onChange={(e) => handleStatusChange(ord._id || ord.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition ${getStatusBadgeStyle(ord.status || 'Pending')}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing / Crafting</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS & INVENTORY */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Card */}
              <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  Add New Product / Kit
                </h3>
                
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ancient Forest Terrarium Jar"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-600 font-semibold mb-1">Price (৳)</label>
                      <input
                        type="number"
                        required
                        placeholder="1200"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-600 font-semibold mb-1">Category</label>
                      <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      >
                        <option value="Terrarium">Terrarium</option>
                        <option value="Moss Craft">Moss Craft</option>
                        <option value="DIY Kit">DIY Kit</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">Product Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleImageChange}
                      className="w-full text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-800 file:text-white hover:file:bg-emerald-900 cursor-pointer"
                    />
                    {productImage && (
                      <div className="mt-2 flex items-center gap-3 bg-stone-50 p-2 rounded-xl border border-stone-200">
                        <img src={productImage} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-emerald-600" />
                        <span className="text-[11px] text-emerald-800 font-semibold">Image Ready!</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">Description & Plant Care Note</label>
                    <textarea
                      rows="3"
                      placeholder="e.g. Contains live Cushion Moss & Fittonia plant. Indirect light needed."
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{loading ? 'Saving to Database...' : 'Add Product'}</span>
                  </button>
                </form>
              </div>

              {/* Product List */}
              <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-stone-900">
                  Active Products Catalog ({products.length})
                </h3>
                
                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {products.length === 0 ? (
                    <p className="text-xs text-stone-400 text-center py-8">No products created in database yet.</p>
                  ) : (
                    products.map((item) => (
                      <div 
                        key={item._id || item.id}
                        className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl flex items-center justify-between gap-4 transition hover:border-stone-300"
                      >
                        <div className="flex items-center gap-3.5">
                          <img 
                            src={getImageSrc(item.image || item.imageUrl)} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/150?text=Error";
                            }}
                          />
                          <div>
                            <h4 className="text-xs font-bold text-stone-800">{item.name}</h4>
                            <p className="text-[11px] text-stone-500 font-semibold mt-0.5">
                              ৳ {item.price} • <span className="text-emerald-800 font-bold">{item.category || 'Terrarium'}</span>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(item)}
                          className="text-stone-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition"
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

          {/* TAB 3: CUSTOM TERRARIUM ENQUIRIES */}
          {activeTab === 'custom' && (
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Custom Terrarium Design Queries ({enquiries.length})
                </h3>
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Customer Wishlists
                </span>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <Sparkles className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-60" />
                  <h4 className="text-xs font-bold text-stone-700">No Custom Enquiries Received Yet</h4>
                  <p className="text-[11px] text-stone-400 mt-1 max-w-sm mx-auto">
                    When customers submit custom requests from the storefront, they will show up right here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((item, idx) => (
                    <div 
                      key={item._id || idx} 
                      className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-600/40 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded">
                            {item.jarType || 'Custom Jar'} • {item.theme || 'Forest'}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-stone-900 mt-1">Customer: {item.customerName}</p>
                        <p className="text-xs text-stone-600">Phone: {item.phone}</p>
                        {item.details && (
                          <p className="text-[11px] text-stone-500 italic bg-white p-2 rounded-xl border border-stone-200 mt-1">
                            "{item.details}"
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-stone-500">Proposed Budget</p>
                        <p className="text-base font-extrabold text-emerald-800">৳ {(Number(item.budget) || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-base font-bold text-stone-900">Store Analytics & Summary</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                  <p className="text-xs text-stone-500 font-semibold">Total Received Orders</p>
                  <h3 className="text-3xl font-extrabold text-emerald-900">{totalOrdersCount}</h3>
                  <p className="text-[11px] text-amber-700 font-medium">{pendingOrdersCount} orders currently pending</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                  <p className="text-xs text-stone-500 font-semibold">Active Catalog Products</p>
                  <h3 className="text-3xl font-extrabold text-emerald-900">{activeProductsCount}</h3>
                  <p className="text-[11px] text-emerald-700 font-medium">Ready for online storefront</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                  <p className="text-xs text-stone-500 font-semibold">Total Revenue Generated</p>
                  <h3 className="text-3xl font-extrabold text-emerald-900">৳ {totalRevenue.toLocaleString()}</h3>
                  <p className="text-[11px] text-stone-400 font-medium">Calculated from order total amounts</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
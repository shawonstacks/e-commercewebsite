import React, { useState, useEffect } from 'react';
import { 
  Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  LogOut, LayoutDashboard, Package, ShoppingBag, Users, Settings, Bell, Search, User 
} from 'lucide-react';

// ==========================================
// 1. ADMIN LOGIN / SIGN UP COMPONENT
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
// 2. MAIN ADMIN PANEL WITH REAL DATA STATS
// ==========================================
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Real Dynamic Stats States
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    // Load actual data from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setOrders(savedOrders);
    setProducts(savedProducts);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
  };

  // Calculate real metrics
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1411] border-r border-emerald-950 flex flex-col justify-between p-4">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="bg-emerald-600 text-stone-950 font-black p-2 rounded-xl text-sm">TM</div>
            <div>
              <h2 className="font-bold text-emerald-100 text-sm tracking-wide">The Moss Wanderer</h2>
              <p className="text-[10px] text-stone-400 uppercase font-semibold">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeTab === 'dashboard' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:bg-emerald-950/40 hover:text-emerald-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeTab === 'products' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:bg-emerald-950/40 hover:text-emerald-300'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeTab === 'orders' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:bg-emerald-950/40 hover:text-emerald-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeTab === 'customers' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:bg-emerald-950/40 hover:text-emerald-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/30 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0f0d]">
        
        <header className="h-16 border-b border-emerald-950 px-6 flex items-center justify-between bg-[#0d1411]/50 backdrop-blur">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="w-full bg-[#121d18] border border-emerald-900/40 rounded-xl pl-9 pr-4 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-400 hover:text-emerald-400 bg-[#121d18] rounded-xl border border-emerald-900/40">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 border-l border-emerald-950 pl-4">
              <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center font-bold text-xs">A</div>
              <span className="text-xs font-semibold text-stone-300">Admin</span>
            </div>
          </div>
        </header>

        {/* Body View */}
        <div className="p-8 overflow-y-auto flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-emerald-100">Overview Dashboard</h1>
              
              {/* Dynamic Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121d18] p-6 rounded-2xl border border-emerald-900/40">
                  <p className="text-xs text-stone-400 font-semibold mb-1">Total Orders</p>
                  <h3 className="text-3xl font-black text-emerald-400">{totalOrdersCount}</h3>
                </div>
                <div className="bg-[#121d18] p-6 rounded-2xl border border-emerald-900/40">
                  <p className="text-xs text-stone-400 font-semibold mb-1">Active Products</p>
                  <h3 className="text-3xl font-black text-emerald-400">{activeProductsCount}</h3>
                </div>
                <div className="bg-[#121d18] p-6 rounded-2xl border border-emerald-900/40">
                  <p className="text-xs text-stone-400 font-semibold mb-1">Total Revenue</p>
                  <h3 className="text-3xl font-black text-emerald-400">৳ {totalRevenue.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-[#121d18] p-8 rounded-2xl border border-emerald-900/40 text-center text-stone-400 text-sm">
              {activeTab.toUpperCase()} Section Contents
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
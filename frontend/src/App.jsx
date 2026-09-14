import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE_URL = 'http://172.16.54.178:5001/api'; // Backend Port 5001

export default function App() {
  const [activeTab, setActiveTab] = useState('store'); // 'store' or 'admin'
  const [darkMode, setDarkMode] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, netProfit: 0, pendingOrders: 0, confirmedOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  // Fetch Products & Admin Data
  useEffect(() => {
    fetchProducts();
    if (activeTab === 'admin') {
      fetchOrders();
      fetchStats();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/analytics/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      toast.error('Failed to load stats');
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Order marked as ${newStatus}!`);
        fetchOrders();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toaster position="top-right" />

      {/* Header / Navbar */}
      <nav className="p-4 border-b border-gray-800 flex justify-between items-center bg-slate-800/50 backdrop-blur">
        <h1 className="text-xl font-bold tracking-wide">🌿 THE MOSS WANDERER</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'store' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-700'
            }`}
          >
            Store Front
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'admin' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-700'
            }`}
          >
            Admin Panel
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-slate-700 rounded-full hover:bg-slate-600"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* ================= STORE FRONT VIEW ================= */}
        {activeTab === 'store' && (
          <div>
            <div className="flex flex-wrap gap-4 justify-between mb-6">
              <input
                type="text"
                placeholder="Search terrariums..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 w-full md:w-80"
              />
              <div className="flex gap-2">
                {['All', 'Terrarium', 'Moss Art'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg border border-slate-700 ${
                      selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skeleton Loaders */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-64 bg-slate-800 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <div key={p._id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg p-4">
                    <img src={p.imageUrl} alt={p.name} className="h-48 w-full object-cover rounded-lg mb-4" />
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{p.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-emerald-400 font-extrabold text-xl">৳{p.price}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ADMIN PANEL VIEW ================= */}
        {activeTab === 'admin' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard & Financial Overview</h2>

            {/* Financial Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold text-emerald-400">৳{stats.totalRevenue}</h3>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
                <p className="text-gray-400 text-sm">Net Profit (লাভ)</p>
                <h3 className="text-2xl font-bold text-blue-400">৳{stats.netProfit}</h3>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
                <p className="text-gray-400 text-sm">Pending Orders</p>
                <h3 className="text-2xl font-bold text-amber-400">{stats.pendingOrders}</h3>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
                <p className="text-gray-400 text-sm">Confirmed Orders</p>
                <h3 className="text-2xl font-bold text-purple-400">{stats.confirmedOrders}</h3>
              </div>
            </div>

            {/* Order Management Table */}
            <h3 className="text-xl font-bold mb-4">Order Management</h3>
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-gray-400 text-sm">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Address</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-slate-700/50 hover:bg-slate-750">
                      <td className="p-4 font-medium">{order.customerName}</td>
                      <td className="p-4 text-sm text-gray-300">{order.shippingAddress}</td>
                      <td className="p-4 font-bold text-emerald-400">৳{order.totalAmount}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : order.status === 'cancelled'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'confirmed')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'cancelled')}
                              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
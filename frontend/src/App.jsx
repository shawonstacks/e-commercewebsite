import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, ShoppingCart, Leaf, Shield, ArrowLeft } from 'lucide-react';
import AdminPanel from './components/AdminPanel';

const API_BASE_URL = `http://${window.location.hostname}:5000`;

// Safe Image Resolver Utility
const getImageSrc = (image) => {
  if (!image || typeof image !== 'string' || image.trim() === '') {
    return 'https://via.placeholder.com/400x400?text=No+Image+Available';
  }
  if (!image.startsWith('data:image') && !image.startsWith('http') && !image.startsWith('/uploads')) {
    return `data:image/jpeg;base64,${image}`;
  }
  if (image.startsWith('/uploads')) {
    return `${API_BASE_URL}${image}`;
  }
  return image;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('store'); // 'store' or 'admin'
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // URL Path Check (E.g. if user types /admin in address bar)
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setCurrentPage('admin');
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'store') {
      fetchProducts();
    }
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // If page state is Admin, Render AdminPanel Component
  if (currentPage === 'admin') {
    return (
      <div>
        <div className="bg-[#0a120e] px-6 py-2 border-b border-emerald-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              setCurrentPage('store');
            }}
            className="text-emerald-400 text-xs font-bold flex items-center gap-1.5 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Customer Store
          </button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  // Render Customer Store Page
  return (
    <div className="min-h-screen bg-[#070d0a] text-stone-100 font-sans p-6 md:p-10 relative">
      
      {/* Top Floating Admin Switch Button */}
      <div className="max-w-7xl mx-auto flex justify-end mb-4">
        <button
          onClick={() => {
            window.history.pushState({}, '', '/admin');
            setCurrentPage('admin');
          }}
          className="bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition"
        >
          <Shield className="w-4 h-4" />
          <span>Admin Panel</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center space-y-3 mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-stone-100 tracking-tight">
          Nature, Curated for Your Space.
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Terrariums, Moss Art & Miniature Gardens crafted to bring a slice of living nature right into your home.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="max-w-7xl mx-auto bg-[#0d1612] border border-emerald-950/80 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search terrariums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121f19] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <Filter className="w-4 h-4 text-emerald-500 mr-2 hidden md:block" />
          {['All', 'Terrarium', 'Moss Art', 'Plants', 'Accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-stone-950 font-bold'
                  : 'bg-[#121f19] text-stone-400 border border-emerald-900/30 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Display Section */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-stone-100">Our Handcrafted Terrariums</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-emerald-500 text-xs animate-pulse">
            Loading collection...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-stone-500 text-xs bg-[#0d1612] rounded-2xl border border-emerald-950/80">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-[#0f1a14] border border-emerald-950/80 hover:border-emerald-800/60 rounded-2xl p-4 flex flex-col justify-between transition duration-300 group"
              >
                <div>
                  <div className="w-full h-56 bg-[#080e0a] rounded-xl overflow-hidden mb-4 relative">
                    <img
                      src={getImageSrc(item.image || item.imageUrl)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x400?text=Image+Load+Error';
                      }}
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-stone-950/90 border border-emerald-900/80 px-2 py-0.5 rounded-md">
                      {item.category || 'Terrarium'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-100 line-clamp-1 mb-1">{item.name}</h3>
                  <p className="text-xs text-stone-400 line-clamp-2 mb-4">
                    {item.description || 'Custom crafted botanical design.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-emerald-950/60">
                  <span className="text-base font-black text-emerald-400">৳ {item.price}</span>
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 p-2.5 rounded-xl transition flex items-center gap-1.5 text-xs font-bold">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
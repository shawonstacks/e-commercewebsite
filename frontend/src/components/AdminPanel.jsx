import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  LogOut, Plus, Trash2, ArrowLeft, User 
} from 'lucide-react';

const API_BASE_URL = `http://${window.location.hostname}:5000`;

// Safe Image Resolver
const getImageSrc = (image) => {
  if (!image || typeof image !== 'string' || image.trim() === '') {
    return 'https://via.placeholder.com/150?text=No+Image';
  }
  if (!image.startsWith('data:image') && !image.startsWith('http') && !image.startsWith('/uploads')) {
    return `data:image/jpeg;base64,${image}`;
  }
  if (image.startsWith('/uploads')) {
    return `${API_BASE_URL}${image}`;
  }
  return image;
};

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
        setSuccessMsg('Account created successfully!');
        setTimeout(() => {
          localStorage.setItem('isAdminAuthenticated', 'true');
          if (onLoginSuccess) onLoginSuccess();
        }, 1000);
      } catch (err) {
        setError('Registration failed!');
      }
    } else {
      const isDefaultAdmin = phone === '01772818573' && password === 'admin';
      if (isDefaultAdmin) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { phone, password });
          if (res.data) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            if (onLoginSuccess) onLoginSuccess();
          }
        } catch (err) {
          setError('Invalid phone number or password!');
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070d0a] text-stone-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#0d1612] border border-emerald-900/50 rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-3 py-1 rounded-full text-[11px] font-semibold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
          </div>
          <h2 className="text-2xl font-black">{isSignUp ? "Create Admin Account" : "Sign In"}</h2>
        </div>

        {error && <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl text-center">{error}</div>}
        {successMsg && <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl text-center">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-stone-400 mb-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-stone-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#121f19] border border-emerald-900/40 rounded-xl text-xs text-stone-200"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-400 mb-1">Phone Number</label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-stone-500 absolute left-3.5" />
              <input
                type="text"
                required
                placeholder="01772818573"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#121f19] border border-emerald-900/40 rounded-xl text-xs text-stone-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-[#121f19] border border-emerald-900/40 rounded-xl text-xs text-stone-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-stone-500"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-500 text-stone-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2">
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccessMsg(''); }}
            className="text-emerald-400 font-bold text-xs"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('Terrarium');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error('Data Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
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
    if (!productName || !productPrice || !productImage) {
      alert('Product Name, Price and Image are required!');
      return;
    }

    const newProd = {
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription,
      image: productImage
    };

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/products`, newProd);
      alert('Product Added Successfully!');

      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductImage('');
      e.target.reset();

      fetchData();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
        fetchData();
      } catch (err) {
        alert('Failed to delete product.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => { setIsAuthenticated(true); fetchData(); }} />;
  }

  return (
    <div className="min-h-screen bg-[#070d0a] text-stone-100 font-sans flex flex-col">
      
      {/* Header */}
      <header className="border-b border-emerald-950/60 bg-[#0a120e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-900/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </button>
          <span className="text-sm font-bold text-stone-200">Admin Control Panel</span>
        </div>

        <button onClick={handleLogout} className="p-2 text-red-400 bg-red-950/30 rounded-lg hover:bg-red-950/60 transition">
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {loading && <div className="text-xs text-emerald-400 mb-4 text-center">Syncing with server...</div>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Product Form */}
          <div className="lg:col-span-5 bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-stone-100 mb-5">Add New Product</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-400 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="Forest Terrarium"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Price (৳)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200"
                  >
                    <option value="Terrarium">Terrarium</option>
                    <option value="Moss Art">Moss Art</option>
                    <option value="Plants">Plants</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="w-full text-xs text-stone-400 bg-[#121f19] border border-emerald-900/50 rounded-xl p-2"
                />
                {productImage && (
                  <div className="mt-2.5 flex items-center gap-3 bg-[#121f19] p-2 rounded-xl">
                    <img src={productImage} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                    <span className="text-[11px] text-emerald-400 font-medium">Image Ready!</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Description..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full bg-[#121f19] border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-stone-200"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-stone-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-7 bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-100">All Products ({products.length})</h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {products.length === 0 ? (
                <p className="text-xs text-stone-500 text-center py-8">No products added yet.</p>
              ) : (
                products.map((item) => (
                  <div 
                    key={item._id || item.id}
                    className="bg-[#121f19] border border-emerald-900/30 p-3 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={getImageSrc(item.image || item.imageUrl)} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded-lg border border-emerald-900/50 bg-[#080e0a]"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                      <div>
                        <h4 className="text-xs font-bold text-stone-200">{item.name}</h4>
                        <p className="text-[11px] text-stone-400">৳ {item.price} • {item.category || 'Terrarium'}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(item._id || item.id)}
                      className="text-stone-500 hover:text-red-400 p-2 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
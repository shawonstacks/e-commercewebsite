import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Edit, X, ArrowLeft, PackageCheck, ShoppingBag } from 'lucide-react';

function AdminPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Terrarium', description: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const fetchOrders = () => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:5000/api/products/${editingId}`, formData)
        .then(() => {
          resetForm();
          fetchProducts();
        });
    } else {
      axios.post('http://localhost:5000/api/products', formData)
        .then(() => {
          resetForm();
          fetchProducts();
        });
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || 'Terrarium',
      description: product.description || '',
      imageUrl: product.imageUrl || ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => fetchProducts());
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: 'Terrarium', description: '', imageUrl: '' });
  };

  return (
    <div className="min-h-screen bg-[#0d1411] text-stone-200 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-emerald-900/50 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-100">Admin Dashboard</h2>
          <p className="text-xs text-emerald-400 mt-1">Manage Products & Customer Orders</p>
        </div>
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 text-xs px-4 py-2 rounded-xl transition border border-emerald-700/40"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Website
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition ${
            activeTab === 'orders' 
              ? 'bg-emerald-600 text-stone-950 shadow-lg shadow-emerald-900/40' 
              : 'bg-[#121d18] text-emerald-400 border border-emerald-900/50 hover:bg-[#182620]'
          }`}
        >
          <PackageCheck className="w-4 h-4" /> Customer Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition ${
            activeTab === 'products' 
              ? 'bg-emerald-600 text-stone-950 shadow-lg shadow-emerald-900/40' 
              : 'bg-[#121d18] text-emerald-400 border border-emerald-900/50 hover:bg-[#182620]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Manage Products ({products.length})
        </button>
      </div>

      {/* TAB 1: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#121d18] border border-emerald-900/50 p-8 rounded-2xl text-center text-stone-400">
              No orders placed yet.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-[#121d18] border border-emerald-900/50 p-5 rounded-2xl">
                <div className="flex flex-col md:flex-row justify-between border-b border-emerald-900/40 pb-3 mb-3 gap-2">
                  <div>
                    <h4 className="font-bold text-emerald-200 text-base">{order.customer?.name || "Customer"}</h4>
                    <p className="text-xs text-stone-400">📞 {order.customer?.phone} | 📍 {order.customer?.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 block">Total Payable</span>
                    <span className="text-lg font-bold text-emerald-300">৳ {order.totalAmount}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Ordered Items:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#182620] px-3 py-2 rounded-lg text-xs">
                        <span className="text-stone-200 font-medium">{item.name} <span className="text-emerald-400 font-bold">x{item.quantity}</span></span>
                        <span className="text-stone-400">৳ {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: MANAGE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="bg-[#121d18] border border-emerald-900/50 p-6 rounded-2xl h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-emerald-200 text-lg">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              {editingId && (
                <button onClick={resetForm} className="text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-300 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Forest Moss Terrarium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 mb-1">Price (৳)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="1500"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">Category</label>
                  <input 
                    type="text" 
                    placeholder="Terrarium"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Description</label>
                <textarea 
                  rows="3"
                  placeholder="Product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 bg-[#121d18] border border-emerald-900/50 p-6 rounded-2xl">
            <h3 className="font-bold text-emerald-200 text-lg mb-4">All Products ({products.length})</h3>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              {products.map((item) => (
                <div key={item._id} className="flex items-center justify-between bg-[#182620] border border-emerald-900/30 p-3 rounded-xl gap-4">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600"} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-emerald-100">{item.name}</h4>
                    <p className="text-xs text-emerald-400">৳ {item.price} • <span className="text-stone-400">{item.category}</span></p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded-lg transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-950/50 hover:bg-red-900/80 text-red-400 rounded-lg transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
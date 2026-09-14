import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { Leaf, Sparkles, MessageCircle, Search, Filter } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Auth States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const whatsappNumber = "8801772818573"; 
  const whatsappMessage = encodeURIComponent("Hello! I want to know more about your Moss Terrariums.");

  // ডায়নামিক Hostname দিয়ে API Call
  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE_URL]);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => 
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ইমেজ URL সার্ভারের IP/Domain অনুযায়ী ফিক্স করার ফাংশন
  const getImageUrl = (url) => {
    if (!url || url.includes('via.placeholder')) {
      return "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600";
    }
    return url.replace('localhost', window.location.hostname);
  };

  // ক্যাটাগরি ফিল্টারিং ডাটা
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // ফিল্টার করা প্রোডাক্ট তালিকা
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (window.location.pathname === '/admin') {
    return <AdminPanel onBack={() => window.location.href = '/'} />;
  }

  return (
    <div className="min-h-screen bg-[#0d1411] text-stone-200 font-sans relative flex flex-col justify-between">
      <div>
        {/* Navbar with Auth Props */}
        <Navbar 
          cartCount={totalCartCount} 
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenAuth={() => setIsAuthOpen(true)}
          user={user}
          onLogout={handleLogout}
        />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart} 
          setCart={setCart} 
          onCheckout={() => setIsCheckoutOpen(true)}
        />

        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          cart={cart} 
          setCart={setCart} 
        />

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart} 
        />

        {/* Customer Auth Login Modal */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLoginSuccess={(userData) => setUser(userData)} 
        />

        {/* Floating WhatsApp Button */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-stone-950 p-3.5 rounded-full shadow-2xl transition duration-300 flex items-center gap-2 text-xs font-bold active:scale-95 group"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-stone-950" />
          <span className="hidden group-hover:inline-block pr-1">Chat with Us</span>
        </a>

        {/* Banner Section */}
        <header className="relative my-6 text-center max-w-4xl mx-auto px-4 py-8 rounded-2xl bg-gradient-to-b from-[#182620] to-[#0d1411] border border-emerald-900/40">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-800/50 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Tiny Worlds of Green
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-emerald-50 tracking-tight">
            Nature, Curated for Your Space.
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Terrariums, Moss Art & Miniature Gardens crafted to bring a slice of living nature right into your home.
          </p>
        </header>

        {/* Search & Filter Controls */}
        <section className="max-w-6xl mx-auto px-4 mt-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#141f1a] p-4 rounded-xl border border-emerald-900/40">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type="text"
                placeholder="Search terrariums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-emerald-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-stone-950 shadow-md shadow-emerald-900/40'
                      : 'bg-[#0d1411] text-stone-400 hover:text-emerald-300 border border-emerald-900/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-6xl mx-auto px-4 mt-8">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-100">Our Handcrafted Terrariums</h3>
          </div>

          {/* Skeleton Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="bg-[#141f1a] border border-emerald-900/30 rounded-xl overflow-hidden p-3 animate-pulse">
                  <div className="w-full h-36 sm:h-44 bg-emerald-950/50 rounded-lg mb-3"></div>
                  <div className="h-3 bg-emerald-950/80 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-emerald-950/80 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-emerald-950/80 rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center pt-2 border-t border-emerald-900/20">
                    <div className="h-4 bg-emerald-950/80 rounded w-1/4"></div>
                    <div className="h-7 bg-emerald-950/80 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty Search Results */
            <div className="text-center py-12 bg-[#141f1a] rounded-xl border border-emerald-900/30">
              <p className="text-stone-400 text-sm">No products found matching your search criteria.</p>
            </div>
          ) : (
            /* Grid layout - Mobiles: 2 columns, Desktop: 3/4 columns */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product._id} 
                  className="bg-[#141f1a] border border-emerald-900/40 rounded-xl overflow-hidden hover:border-emerald-600/50 transition duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div onClick={() => setSelectedProduct(product)}>
                    <div className="w-full h-36 sm:h-44 overflow-hidden bg-[#0d1411]">
                      <img 
                        src={getImageUrl(product.imageUrl)} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <span className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                        {product.category || "Terrarium"}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold mt-2 text-emerald-50 group-hover:text-emerald-300 transition line-clamp-1">{product.name}</h4>
                      <p className="text-stone-400 text-[11px] sm:text-xs mt-1 leading-relaxed line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 pt-0 mt-auto flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center border-t border-emerald-900/30">
                    <div>
                      <span className="text-[10px] text-stone-400 block sm:hidden">Price</span>
                      <span className="text-sm sm:text-base font-bold text-emerald-300">৳ {product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-[11px] sm:text-xs transition active:scale-95 shadow-md shadow-emerald-900/30 text-center"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
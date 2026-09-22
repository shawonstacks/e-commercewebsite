import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import axios from 'axios';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { Leaf, MessageCircle, Search, Filter } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Auth States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const whatsappNumber = "8801772818573"; 
  const whatsappMessage = encodeURIComponent("Hello! I want to know more about your Moss Terrariums.");

  // Dynamic Hostname for API Call
  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
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

  // Image URL/Base64 handling
  const getImageUrl = (product) => {
    const imgPath = product.image || product.imageUrl;

    if (!imgPath || imgPath.includes('via.placeholder') || imgPath.includes('unsplash.com')) {
      return "https://via.placeholder.com/400x300?text=Terrarium+Image";
    }

    if (imgPath.startsWith('data:image')) {
      return imgPath;
    }

    return imgPath.replace('localhost', window.location.hostname);
  };

  // Search and Category Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
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

        {/* New Hero Section Component */}
        <Hero />

        {/* Search & Filter Section */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-[#121c18] border border-emerald-900/40 p-3 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search terrariums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#0d1411] border border-emerald-900/50 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-emerald-500 placeholder-stone-500"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Filter className="w-4 h-4 text-emerald-500 mr-1" />
              {['All', 'Terrarium', 'Moss Art'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-stone-950 font-bold'
                      : 'bg-[#182620] text-stone-300 hover:bg-emerald-900/40 border border-emerald-900/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Products Grid */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-100">Our Handcrafted Terrariums</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-[#141f1a] border border-emerald-900/40 rounded-xl overflow-hidden hover:border-emerald-600/50 transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div onClick={() => setSelectedProduct(product)}>
                  <div className="w-full h-36 sm:h-44 overflow-hidden bg-[#0d1411]">
                    <img 
                      src={getImageUrl(product)} 
                      alt={product.name} 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
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
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
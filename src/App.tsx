import React, { useState, useEffect, useMemo } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { BlogView } from './components/BlogView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { PolicyViews } from './components/PolicyViews';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

import { WATCH_PRODUCTS, VERIFY_PRICES } from './data/products';
import { WatchProduct, CartItem } from './types';
import { 
  getStoredCart, saveStoredCart, WHATSAPP_NUMBER, DISPLAY_WHATSAPP 
} from './utils/orderHelper';
import { 
  Filter, ArrowUpDown, Check, MessageCircle, Clock, ShieldCheck, Sparkles, SlidersHorizontal 
} from 'lucide-react';

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'shipping' | 'return'>('privacy');

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceTier, setPriceTier] = useState<string>('all'); // all | 999 | 1499 | 1799 | 1999 | 2499 | 3499
  const [sortOption, setSortOption] = useState<string>('featured'); // featured | price-asc | price-desc | rating

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Selected Product for Details Modal
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Cart changes to LocalStorage
  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  // Total items in cart
  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Show Toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to Cart handler
  const handleAddToCart = (product: WatchProduct, quantity: number = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0] || 'Standard';
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  // Instant Buy Now handler (Adds to cart & navigates to checkout)
  const handleBuyNow = (product: WatchProduct, quantity: number = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0] || 'Standard';
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity = quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color }];
      }
    });

    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update Cart quantity
  const handleUpdateCartQuantity = (productId: string, quantity: number, color?: string) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedColor === color) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Remove Cart item
  const handleRemoveCartItem = (productId: string, color?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor === color)
      )
    );
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Navigation router
  const handleNavigate = (page: string, params?: any) => {
    if (['privacy', 'terms', 'shipping', 'return'].includes(page)) {
      setPolicyType(page as any);
      setCurrentPage('policy');
    } else {
      setCurrentPage(page);
    }

    if (params?.category) {
      setSelectedCategory(params.category);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return WATCH_PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Search query
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      // Price tier
      let matchesPrice = true;
      if (priceTier !== 'all') {
        matchesPrice = product.price === Number(priceTier);
      }

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, priceTier, sortOption]);

  // Check pricing verification on boot (developer log)
  useEffect(() => {
    const stats = VERIFY_PRICES();
    console.log('ZK.PK Product Price Distribution Verification:', stats);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage === 'policy' ? policyType : currentPage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {/* HOME VIEW */}
        {currentPage === 'home' && (
          <div className="space-y-4">
            {/* Hero Banner */}
            <HeroSection
              onShopClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreAutomatics={() => {
                setSelectedCategory('Automatic Watches');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Category Quick Filter Grid */}
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Main 40 Watches Catalog Section */}
            <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
              
              {/* Filter and Sorting Header Bar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                      Guaranteed 100% Watches
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">
                      Showing {filteredProducts.length} Timepieces
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                    {selectedCategory === 'All' ? 'Complete Watch Catalog' : selectedCategory}
                  </h2>
                </div>

                {/* Filter Controls Bar (Interactive Segmented buttons, compliant with design constitution) */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  
                  {/* Price Tier Filter Selector */}
                  <div className="flex items-center gap-1.5 bg-[#141624] p-1 rounded-xl border border-white/10">
                    <span className="text-slate-400 px-2 font-medium">Price:</span>
                    <select
                      value={priceTier}
                      onChange={(e) => setPriceTier(e.target.value)}
                      aria-label="Filter by Price Tier"
                      className="bg-transparent text-white focus:outline-none pr-2 font-semibold"
                    >
                      <option value="all" className="bg-[#141624]">All Prices</option>
                      <option value="999" className="bg-[#141624]">Rs. 999 (10 Models)</option>
                      <option value="1499" className="bg-[#141624]">Rs. 1,499 (5 Models)</option>
                      <option value="1799" className="bg-[#141624]">Rs. 1,799 (5 Models)</option>
                      <option value="1999" className="bg-[#141624]">Rs. 1,999 (10 Models)</option>
                      <option value="2499" className="bg-[#141624]">Rs. 2,499 (5 Models)</option>
                      <option value="3499" className="bg-[#141624]">Rs. 3,499 (5 Models)</option>
                    </select>
                  </div>

                  {/* Sort Selector */}
                  <div className="flex items-center gap-1.5 bg-[#141624] p-1 rounded-xl border border-white/10">
                    <ArrowUpDown className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      aria-label="Sort Watches By"
                      className="bg-transparent text-white focus:outline-none pr-2 font-semibold"
                    >
                      <option value="featured" className="bg-[#141624]">Featured First</option>
                      <option value="price-asc" className="bg-[#141624]">Price: Low to High</option>
                      <option value="price-desc" className="bg-[#141624]">Price: High to Low</option>
                      <option value="rating" className="bg-[#141624]">Highest Rated</option>
                    </select>
                  </div>

                  {/* Reset Filters button if filters active */}
                  {(selectedCategory !== 'All' || priceTier !== 'all' || searchQuery !== '') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setPriceTier('all');
                        setSearchQuery('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Product Grid: 4 per row desktop, 2 per row mobile */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 space-y-3 bg-[#11131c] rounded-2xl border border-white/5">
                  <Clock className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-lg font-bold text-white">No Watches Found</h3>
                  <p className="text-xs text-slate-400">
                    No timepieces matched your current filters. Try resetting the category or price range.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceTier('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs"
                  >
                    View All 40 Watches
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => {
                        e?.stopPropagation();
                        handleAddToCart(p, 1);
                      }}
                      onBuyNow={(p, e) => {
                        e?.stopPropagation();
                        handleBuyNow(p, 1);
                      }}
                    />
                  ))}
                </div>
              )}

            </section>

            {/* Middle Feature Banner: Open Parcel Inspection Guarantee */}
            <section className="py-12 bg-gradient-to-r from-[#121422] via-[#1a1e2f] to-[#121422] border-y border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center">
                  <div className="space-y-1">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                      100% Anti-Fraud Shopping
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-luxury">
                      Open Parcel Before Payment
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Unlike standard online stores that lock you into blind parcels, ZK.PK authorizes riders from TCS and Leopards Courier to let you open the box and verify your watch before paying cash.
                  </p>
                  <div className="flex justify-center md:justify-end">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum ZK.PK! I want to confirm your open parcel policy.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp ({DISPLAY_WHATSAPP})</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* WATCHES DEDICATED VIEW */}
        {currentPage === 'products' && (
          <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  ZK.PK Collection
                </span>
                <h1 className="text-3xl font-extrabold text-white font-luxury">
                  All 40 Watch Models
                </h1>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by Category"
                  className="bg-[#141624] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Men's Watches">Men's Watches</option>
                  <option value="Luxury Watches">Luxury Watches</option>
                  <option value="Chronograph Watches">Chronograph Watches</option>
                  <option value="Automatic Watches">Automatic Watches</option>
                  <option value="Classic Watches">Classic Watches</option>
                  <option value="Casual Watches">Casual Watches</option>
                </select>

                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  aria-label="Filter by Price Tier"
                  className="bg-[#141624] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="999">Rs. 999 (10 Models)</option>
                  <option value="1499">Rs. 1,499 (5 Models)</option>
                  <option value="1799">Rs. 1,799 (5 Models)</option>
                  <option value="1999">Rs. 1,999 (10 Models)</option>
                  <option value="2499">Rs. 2,499 (5 Models)</option>
                  <option value="3499">Rs. 3,499 (5 Models)</option>
                </select>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  aria-label="Sort Watches By"
                  className="bg-[#141624] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, e) => {
                    e?.stopPropagation();
                    handleAddToCart(p, 1);
                  }}
                  onBuyNow={(p, e) => {
                    e?.stopPropagation();
                    handleBuyNow(p, 1);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* CATEGORIES DEDICATED VIEW */}
        {currentPage === 'categories' && (
          <div className="py-10 space-y-8">
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-white mb-6 font-luxury">
                Watches in {selectedCategory} ({filteredProducts.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={(p, e) => {
                      e?.stopPropagation();
                      handleAddToCart(p, 1);
                    }}
                    onBuyNow={(p, e) => {
                      e?.stopPropagation();
                      handleBuyNow(p, 1);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHECKOUT VIEW */}
        {currentPage === 'checkout' && (
          <CheckoutView
            items={cart}
            onBackToShopping={() => setCurrentPage('home')}
            onClearCart={handleClearCart}
          />
        )}

        {/* BLOG VIEW */}
        {currentPage === 'blog' && <BlogView />}

        {/* ABOUT VIEW */}
        {currentPage === 'about' && <AboutView />}

        {/* CONTACT VIEW */}
        {currentPage === 'contact' && <ContactView />}

        {/* POLICY VIEWS */}
        {currentPage === 'policy' && (
          <PolicyViews
            type={policyType}
            onBackToShopping={() => setCurrentPage('home')}
          />
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty, color) => handleAddToCart(product, qty, color)}
        onBuyNow={(product, qty, color) => handleBuyNow(product, qty, color)}
      />

      {/* Cart Drawer Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setCurrentPage('checkout')}
        onShopMore={() => {
          setIsCartOpen(false);
          setCurrentPage('home');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161928] border border-amber-400/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-slide-up text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick WhatsApp Chat Widget */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum ZK.PK! I am browsing your watch website and would like some assistance.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-950/60 transition-transform hover:scale-110 flex items-center gap-2 group"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-xs font-bold pr-1">
          WhatsApp Us
        </span>
      </a>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

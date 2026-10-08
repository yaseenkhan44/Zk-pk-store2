import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, ShieldCheck, Clock, Award } from 'lucide-react';
import { DISPLAY_WHATSAPP, WHATSAPP_NUMBER } from '../utils/orderHelper';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Watches' },
    { id: 'categories', label: 'Categories' },
    { id: 'blog', label: 'Watch Guide & Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin Portal' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0e14]/95 backdrop-blur-md border-b border-white/10 text-white">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#181a24] via-[#1f2330] to-[#181a24] border-b border-white/5 py-1.5 px-4 text-xs font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              OPEN PARCEL BEFORE PAYMENT
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-300">
              Cash on Delivery Across Pakistan (TCS / Leopards)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-amber-300">Free Shipping on orders above Rs. 1,999</span>
            <span className="text-slate-500">·</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum ZK.PK! I have a question regarding watches.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: {DISPLAY_WHATSAPP}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6 text-black stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-wider font-luxury text-white group-hover:text-amber-400 transition-colors">
                  ZK.PK
                </span>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-400/90 -mt-1">
                  PREMIUM WATCHES
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none ${
                  currentPage === link.id
                    ? 'text-amber-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Search, WhatsApp quick CTA, Cart, Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Desktop Search Input */}
            <div className="hidden md:flex items-center relative w-56 lg:w-64">
              <input
                type="text"
                placeholder="Search watches (e.g. Curren, Automatic)..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'products') {
                    onNavigate('products');
                  }
                }}
                className="w-full bg-[#161822] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/50 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Quick Order Badge */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum ZK.PK! I want to inquire about your watch collection.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/80 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-lg bg-[#161822] border border-white/10 hover:border-amber-400/50 hover:bg-[#1e212f] text-white transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Box (Toggled) */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search watches (e.g. Naviforce, Rs. 999)..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'products') {
                    onNavigate('products');
                  }
                }}
                className="w-full bg-[#161822] border border-amber-400/40 rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1017] border-b border-white/10 px-4 pt-3 pb-6 animate-slide-down">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum ZK.PK! I want to order a watch.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Order via WhatsApp ({DISPLAY_WHATSAPP})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

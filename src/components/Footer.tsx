import React from 'react';
import { Clock, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { DISPLAY_WHATSAPP, SUPPORT_EMAIL, WHATSAPP_NUMBER } from '../utils/orderHelper';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#090a0f] border-t border-white/10 text-slate-400 text-xs">
      
      {/* Upper USP Strip */}
      <div className="border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block text-sm">Open Parcel Check</strong>
              <span className="text-[11px] text-slate-400">Inspect watch before paying rider</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block text-sm">Cash on Delivery</strong>
              <span className="text-[11px] text-slate-400">Nationwide courier network</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block text-sm">7-Day Replacement</strong>
              <span className="text-[11px] text-slate-400">Easy defect exchange warranty</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block text-sm">100% Watches Only</strong>
              <span className="text-[11px] text-slate-400">Zero non-watch distractions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black">
                <Clock className="w-5 h-5 text-black stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black text-white font-luxury tracking-wider">
                ZK.PK
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pakistan's dedicated home for authentic men's wristwatches, chronographs, and mechanical automatics. Sourced with precision, tested for durability, and delivered with open parcel inspection.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  WhatsApp: {DISPLAY_WHATSAPP}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a 
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Karachi, Sindh, Pakistan (Nationwide COD)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-luxury">
              Watch Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('products', { category: "Men's Watches" })} className="hover:text-white transition-colors">
                  Men's Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', { category: 'Luxury Watches' })} className="hover:text-white transition-colors">
                  Luxury Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', { category: 'Chronograph Watches' })} className="hover:text-white transition-colors">
                  Chronograph Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', { category: 'Automatic Watches' })} className="hover:text-white transition-colors">
                  Automatic Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', { category: 'Classic Watches' })} className="hover:text-white transition-colors">
                  Classic Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', { category: 'Casual Watches' })} className="hover:text-white transition-colors">
                  Casual Watches
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Guides */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-luxury">
              Company & Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About ZK.PK
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Watch Buying Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-amber-400 transition-colors text-slate-500">
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-luxury">
              Policies & Terms
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('return')} className="hover:text-white transition-colors">
                  Return & Replacement
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} ZK.PK Watches. All rights reserved. Exclusively Watches in Pakistan.
          </div>
          <div className="flex items-center gap-3">
            <span>Payment Accepted:</span>
            <span className="text-slate-300 font-medium">Cash on Delivery (COD)</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">Bank Transfer</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">EasyPaisa / JazzCash</span>
          </div>
        </div>

      </div>

    </footer>
  );
};

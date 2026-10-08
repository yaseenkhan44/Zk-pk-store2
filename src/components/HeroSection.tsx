import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onExploreAutomatics: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onExploreAutomatics
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0b0c11] via-[#10121a] to-[#0c0d12] border-b border-white/10">
      {/* Background Subtle Luxury Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            
            {/* Top Sub-tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pakistan's Dedicated Watch Destination</span>
            </div>

            {/* Big Branding + Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-luxury leading-[1.08]">
                <span className="block text-amber-400 text-2xl sm:text-3xl font-sans tracking-[0.25em] uppercase font-bold mb-1">
                  ZK.PK HOROLOGY
                </span>
                Premium Watches.
                <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Timeless Style.
                </span>
              </h1>
            </div>

            {/* Professional Text */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Elevate your wrist game with authentic luxury chronographs, automatic skeletons, and classic dress timepieces. Enjoy guaranteed peace of mind with our exclusive <strong className="text-amber-300 font-medium">Open Parcel Check before Payment</strong> delivered straight to your doorstep across Pakistan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-base tracking-wide shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group focus:outline-none"
              >
                <span>Shop Watches (40 Models)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreAutomatics}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#181a24] hover:bg-[#202433] text-white border border-white/15 hover:border-amber-400/50 font-semibold text-base tracking-wide transition-all focus:outline-none"
              >
                Automatic Mechanicals
              </button>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-left">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Cash on Delivery</div>
                  <div className="text-[11px] text-slate-400">All Pakistan Cities</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Open Parcel First</div>
                  <div className="text-[11px] text-slate-400">Inspect Before Pay</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">7 Days Guarantee</div>
                  <div className="text-[11px] text-slate-400">Easy Replacement</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">100% Genuine</div>
                  <div className="text-[11px] text-slate-400">Quality Inspected</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Ring */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-[#161824] to-[#0f1017] p-2 shadow-2xl shadow-black">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85"
                    alt="ZK.PK Luxury Watch Banner"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#12141c]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                        Featured Collection
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white">
                        Curren & Poedagar Chronos
                      </span>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Starting from Rs. 999 only
                      </span>
                    </div>
                    <button
                      onClick={onShopClick}
                      className="px-3.5 py-2 rounded-lg bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Floating Pill */}
              <div className="absolute -top-4 -left-4 bg-[#181b26] border border-amber-400/40 rounded-2xl p-3 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-base">
                  40
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Handpicked Watches</div>
                  <div className="text-[10px] text-slate-400">Rs. 999 to Rs. 3,499</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

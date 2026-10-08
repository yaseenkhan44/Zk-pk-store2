import React from 'react';
import { Clock, ShieldCheck, Award, Heart, CheckCircle2, Truck, RefreshCw } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Our Horological Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury">
          About ZK.PK - Pakistan's Dedicated Watch House
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Founded on a singular principle: <strong>to sell ONLY watches of genuine distinction</strong> at fair, accessible Pakistani Rupee prices. We do not sell clothes, bags, or random accessories. We eat, breathe, and live horology.
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          <h2 className="text-2xl font-bold text-white font-luxury">
            Why We Specialize Exclusively in Watches
          </h2>
          <p>
            When an online store attempts to sell everything from sneakers to phone cables, quality control inevitably plummets. At <strong>ZK.PK</strong>, our entire sourcing network, testing laboratory, and customer care are dedicated 100% to wristwatches.
          </p>
          <p>
            Every single watch in our 40-model curated collection is chosen after rigorous scrutiny of movement reliability, case finishing, crystal scratch resistance, and water seals. From the legendary SKMEI tactical sport watches to our exquisite Poedagar and OLEVS open-heart mechanical automatics, every piece delivers exceptional wrist presence.
          </p>
          <p>
            We recognize that shopping online in Pakistan historically suffered from trust deficits. That is why we pioneered our transparent <strong>Open Parcel Inspection Before Payment</strong> with courier partners like TCS and Leopards.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-amber-400/30 bg-[#161824] p-3 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80"
            alt="ZK.PK Watch Craftsmanship"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#131520] border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-luxury">100% Inspected</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every movement is timed for 24 hours and crowns are tested before packaging in our custom shock-proof boxes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#131520] border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-luxury">Nationwide COD</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fast dispatch from our Karachi logistics hub to over 300+ cities and tehsils across Pakistan within 2 to 4 business days.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#131520] border border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-luxury">7-Day Easy Exchange</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No arguments, no stress. If you face any manufacturing issue within 7 days of receiving your parcel, we replace it instantly.
          </p>
        </div>
      </div>

    </div>
  );
};

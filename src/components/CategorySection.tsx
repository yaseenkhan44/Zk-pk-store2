import React from 'react';
import { Watch, Compass, Zap, Sparkles, SlidersHorizontal, SunMedium } from 'lucide-react';
import { WATCH_PRODUCTS } from '../data/products';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const categories = [
    {
      id: 'All',
      label: 'All Watches',
      count: WATCH_PRODUCTS.length,
      icon: Watch,
      desc: 'Complete 40-model curated catalog'
    },
    {
      id: "Men's Watches",
      label: "Men's Watches",
      count: WATCH_PRODUCTS.filter(w => w.category === "Men's Watches").length,
      icon: Watch,
      desc: 'Rugged tactical & executive pieces'
    },
    {
      id: 'Luxury Watches',
      label: 'Luxury Watches',
      count: WATCH_PRODUCTS.filter(w => w.category === 'Luxury Watches').length,
      icon: Sparkles,
      desc: 'Gold, royal date & sunray emeralds'
    },
    {
      id: 'Chronograph Watches',
      label: 'Chronograph Watches',
      count: WATCH_PRODUCTS.filter(w => w.category === 'Chronograph Watches').length,
      icon: Compass,
      desc: 'Active stopwatches & sub-dial timers'
    },
    {
      id: 'Automatic Watches',
      label: 'Automatic Watches',
      count: WATCH_PRODUCTS.filter(w => w.category === 'Automatic Watches').length,
      icon: Zap,
      desc: 'Self-winding mechanical skeletons (No battery)'
    },
    {
      id: 'Classic Watches',
      label: 'Classic Watches',
      count: WATCH_PRODUCTS.filter(w => w.category === 'Classic Watches').length,
      icon: SunMedium,
      desc: 'Roman dials, gold bezels & dress leather'
    },
    {
      id: 'Casual Watches',
      label: 'Casual Watches',
      count: WATCH_PRODUCTS.filter(w => w.category === 'Casual Watches').length,
      icon: SlidersHorizontal,
      desc: 'Everyday silicone & slimline mesh'
    }
  ];

  return (
    <section className="py-12 bg-[#0d0e15] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
              Watch Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
              Shop By Watch Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            100% Watches Only. Filter specifically by your preferred movement, dial complication, and lifestyle.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center text-center p-4 rounded-xl border transition-all duration-200 group focus:outline-none ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-[#151722] border-white/10 text-slate-300 hover:border-amber-400/40 hover:bg-[#1a1d2a]'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'bg-[#1e2230] text-amber-400 group-hover:bg-amber-400/20'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                
                <span className="text-xs font-bold leading-tight block">
                  {cat.label}
                </span>

                <span className="text-[10px] text-slate-400 mt-1 block">
                  {cat.count} {cat.count === 1 ? 'Watch' : 'Watches'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

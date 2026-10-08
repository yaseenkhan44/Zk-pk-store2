import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Zap, MessageCircle } from 'lucide-react';
import { WatchProduct } from '../types';
import { createSingleProductWhatsAppUrl } from '../utils/orderHelper';

interface ProductCardProps {
  product: WatchProduct;
  onViewDetails: (product: WatchProduct) => void;
  onAddToCart: (product: WatchProduct, e?: React.MouseEvent) => void;
  onBuyNow: (product: WatchProduct, e?: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  onBuyNow
}) => {
  const [imageError, setImageError] = useState(false);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const fallbackImage = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group relative bg-[#13151f] rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10">
      
      {/* Image Container with Badges & Hover Zoom */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square overflow-hidden bg-[#0d0e14] cursor-pointer"
      >
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-rose-600/90 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded shadow">
            SAVE {discountPercent}%
          </div>
        )}

        {/* Best Seller / Automatic Badge */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 right-2.5 bg-amber-500 text-black font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
            BEST SELLER
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none sm:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="px-3.5 py-2 rounded-lg bg-[#141622]/90 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Metadata: Brand & Category - Clean unboxed text with separators */}
          <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium tracking-wider uppercase">
            <span>{product.brand}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 normal-case">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Specs / Subtitle */}
          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-0.5 text-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-300">
              {product.rating}
            </span>
            <span className="text-[10px] text-slate-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Pricing + Action Buttons */}
        <div className="pt-2 border-t border-white/10 space-y-2.5">
          
          {/* Price Row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-xl font-extrabold text-amber-400 tracking-tight">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] sm:text-xs text-slate-500 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">
              COD Available
            </span>
          </div>

          {/* Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => onAddToCart(product, e)}
              className="w-full py-2 px-2.5 rounded-lg bg-[#1c1f2e] hover:bg-[#252a3e] border border-white/10 hover:border-amber-400/40 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all focus:outline-none"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={(e) => onBuyNow(product, e)}
              className="w-full py-2 px-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs flex items-center justify-center gap-1 transition-all shadow focus:outline-none"
              title="Instant Checkout"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* WhatsApp 1-Click Order Link */}
          <a
            href={createSingleProductWhatsAppUrl(product, 1, product.colors[0])}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-1.5 px-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>Order on WhatsApp</span>
          </a>

        </div>

      </div>

    </div>
  );
};

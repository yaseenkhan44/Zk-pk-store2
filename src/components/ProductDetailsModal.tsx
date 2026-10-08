import React, { useState } from 'react';
import { 
  X, Star, ShoppingBag, Zap, MessageCircle, ShieldCheck, 
  Truck, RefreshCw, Check, Sparkles, Send, User 
} from 'lucide-react';
import { WatchProduct, Review } from '../types';
import { createSingleProductWhatsAppUrl, WHATSAPP_NUMBER } from '../utils/orderHelper';
import { SAMPLE_REVIEWS } from '../data/reviews';

interface ProductDetailsModalProps {
  product: WatchProduct | null;
  onClose: () => void;
  onAddToCart: (product: WatchProduct, quantity: number, selectedColor?: string) => void;
  onBuyNow: (product: WatchProduct, quantity: number, selectedColor?: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Standard');
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [imageError, setImageError] = useState(false);
  
  // Reviews state for this specific product
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS.slice(0, 3));
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80';
  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      city: newReviewCity.trim() || 'Pakistan',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2000);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#11131c] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Images Column */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#090a0f] border border-white/10">
                <img
                  src={imageError ? fallbackImage : activeImage}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                />

                {discountPercent > 0 && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded shadow">
                    SAVE {discountPercent}%
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-black font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    BEST SELLER
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === img ? 'border-amber-400 scale-102' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Peace of Mind Guarantee Banner */}
              <div className="rounded-xl p-3.5 bg-[#171a26] border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>ZK.PK Open Parcel Guarantee</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Upon delivery via TCS or Leopards Courier, you can request the rider to allow visual parcel inspection before handing over the cash. 100% transparent shopping.
                </p>
              </div>

            </div>

            {/* Right: Info Column */}
            <div className="md:col-span-6 space-y-5 text-white">
              
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold tracking-widest uppercase">
                <span>{product.brand}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 font-normal">{product.category}</span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury leading-tight">
                {product.name}
              </h2>

              {/* Star Rating & Reviews Count */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                <span className="text-xs text-emerald-400 font-medium ml-auto flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount} left)
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-xl bg-[#171926] border border-white/10 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">
                    Rs. {product.price.toLocaleString()}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                      <span className="text-emerald-400 font-semibold">You save Rs. {(product.originalPrice - product.price).toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[11px] block text-slate-400">Cash on Delivery</span>
                  <span className="text-xs font-semibold text-emerald-400">Pakistan-wide Delivery</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {product.fullDescription}
              </p>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Select Variant / Color: <span className="text-amber-400 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedColor === color
                            ? 'bg-amber-400/20 border-amber-400 text-white font-semibold'
                            : 'bg-[#181a24] border-white/10 text-slate-300 hover:border-amber-400/40'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-slate-300">Quantity:</span>
                <div className="flex items-center rounded-lg border border-white/15 bg-[#171926]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-300 hover:text-white font-bold text-sm focus:outline-none"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-1.5 text-slate-300 hover:text-white font-bold text-sm focus:outline-none"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  Total: <strong className="text-amber-400">Rs. {(product.price * quantity).toLocaleString()}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedColor);
                      onClose();
                    }}
                    className="py-3 px-4 rounded-xl bg-[#1d2030] hover:bg-[#252a3e] border border-white/15 hover:border-amber-400/40 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all focus:outline-none"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, quantity, selectedColor);
                      onClose();
                    }}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all focus:outline-none"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* WhatsApp Direct Order Button */}
                <a
                  href={createSingleProductWhatsAppUrl(product, quantity, selectedColor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp (+92 311 1089742)</span>
                </a>
              </div>

            </div>

          </div>

          {/* Specifications Table */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-luxury flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Watch Specifications & Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#151722] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Movement / Caliber</span>
                <span className="text-white font-semibold mt-0.5 block">{product.specifications.movement}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#151722] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Case Diameter</span>
                <span className="text-white font-semibold mt-0.5 block">{product.specifications.caseDiameter}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#151722] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Water Resistance</span>
                <span className="text-white font-semibold mt-0.5 block">{product.specifications.waterResistance}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#151722] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Strap / Bracelet</span>
                <span className="text-white font-semibold mt-0.5 block">{product.specifications.strapMaterial}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#151722] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Dial Glass</span>
                <span className="text-white font-semibold mt-0.5 block">{product.specifications.glassType}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#151722] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Warranty Guarantee</span>
                <span className="text-amber-400 font-semibold mt-0.5 block">{product.specifications.warranty}</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="border-t border-white/10 pt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-luxury">
                  Customer Reviews ({product.reviewCount})
                </h3>
                <span className="text-xs text-slate-400">Verified Pakistani Buyers</span>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-1.5 rounded-lg bg-[#1c1f2c] border border-white/10 hover:border-amber-400/40 text-xs text-slate-200 font-medium"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-[#161824] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Leave Your Verified Feedback</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Ali"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-[#1c1f2d] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Your City in Pakistan</label>
                    <input
                      type="text"
                      placeholder="e.g. Karachi, Lahore, Islamabad"
                      value={newReviewCity}
                      onChange={(e) => setNewReviewCity(e.target.value)}
                      className="w-full bg-[#1c1f2d] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-400 mb-1">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className={`p-1 text-sm ${star <= newReviewRating ? 'text-amber-400' : 'text-slate-600'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-400 mb-1">Your Feedback / Watch Experience</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how the watch looks, finishing, packaging, courier delivery time..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-[#1c1f2d] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-amber-300 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Customer Review</span>
                </button>

                {reviewSubmitted && (
                  <p className="text-xs text-emerald-400 font-semibold">Thank you! Your review has been recorded.</p>
                )}
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl bg-[#141620] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="font-bold text-white">{rev.author}</span>
                      <span className="text-[11px] text-slate-400 font-light">({rev.city})</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                          ✓ Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                    ))}
                  </div>

                  <p className="text-slate-300 leading-relaxed font-light text-[11px] sm:text-xs">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

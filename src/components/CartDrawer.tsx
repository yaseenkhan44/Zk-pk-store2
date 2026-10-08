import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { calculateTotals, WHATSAPP_NUMBER } from '../utils/orderHelper';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, color?: string) => void;
  onRemoveItem: (productId: string, color?: string) => void;
  onProceedToCheckout: () => void;
  onShopMore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onShopMore
}) => {
  if (!isOpen) return null;

  const { subtotal, shippingFee, total } = calculateTotals(items);

  // Quick WhatsApp cart order message generator
  const handleWhatsAppQuickCart = () => {
    if (items.length === 0) return;
    const itemLines = items.map((item, idx) => 
      `${idx + 1}. *${item.product.name}* (${item.selectedColor || 'Standard'})\n   Qty: ${item.quantity} x Rs. ${item.product.price.toLocaleString()} = Rs. ${(item.product.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const msg = [
      `*ORDER INQUIRY - ZK.PK*`,
      `Website: https://zk.pk`,
      '',
      `*--- ITEMS IN MY CART ---*`,
      itemLines,
      '',
      `*Subtotal:* Rs. ${subtotal.toLocaleString()}`,
      `*Shipping:* ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}`,
      `*Total:* Rs. ${total.toLocaleString()}`,
      `*Payment:* Cash on Delivery (COD)`,
      '',
      `Please provide my delivery details and confirm dispatch.`
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#11131c] h-full shadow-2xl border-l border-white/10 flex flex-col z-10 animate-slide-left">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141724]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-luxury">
              Your Watch Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner Progress */}
        <div className="px-5 py-2.5 bg-[#171a28] border-b border-white/5 text-xs">
          {subtotal >= 1999 ? (
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>🎉 Congratulations! You have qualified for <strong>FREE DELIVERY</strong>!</span>
            </div>
          ) : (
            <div className="text-slate-300">
              Add <strong className="text-amber-400">Rs. {(1999 - subtotal).toLocaleString()}</strong> more to get <strong>FREE Cash on Delivery</strong>!
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#181a26] border border-white/10 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8 text-amber-400/60" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Your Cart is Empty</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Explore our collection of 40 luxury and classic watches starting from only Rs. 999.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onShopMore();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-colors"
              >
                Browse Watch Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}`}
                className="p-3 rounded-xl bg-[#151722] border border-white/5 flex gap-3 items-center"
              >
                {/* Thumb Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-lg object-cover bg-black shrink-0 border border-white/10"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {item.product.brand}
                  </div>
                  <h4 className="text-xs font-bold text-white truncate" title={item.product.name}>
                    {item.product.name}
                  </h4>
                  {item.selectedColor && (
                    <div className="text-[11px] text-slate-400">
                      Variant: {item.selectedColor}
                    </div>
                  )}
                  <div className="text-xs font-extrabold text-amber-400">
                    Rs. {item.product.price.toLocaleString()}
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center rounded border border-white/10 bg-[#1c1f2e]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="px-2 py-0.5 text-xs text-slate-300 hover:text-white font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-[11px] font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="px-2 py-0.5 text-xs text-slate-300 hover:text-white font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors ml-auto"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing & Checkout Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#141724] space-y-3">
            
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery (Pakistan)</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-400 font-semibold">FREE</strong>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total Payable</span>
                <span className="text-amber-400 text-base">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all focus:outline-none"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* WhatsApp Quick Order button */}
            <button
              onClick={handleWhatsAppQuickCart}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>Checkout via WhatsApp</span>
            </button>

            {/* Assurance */}
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Cash on Delivery · Open Parcel Allowed · 7-Day Guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, ArrowLeft, CheckCircle2, MessageCircle, 
  ShoppingBag, Phone, Mail, MapPin, Building, Hash, Copy, Check 
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { 
  calculateTotals, createCartWhatsAppUrl, saveOrder, 
  DISPLAY_WHATSAPP, WHATSAPP_NUMBER, STORE_NAME 
} from '../utils/orderHelper';

interface CheckoutViewProps {
  items: CartItem[];
  onBackToShopping: () => void;
  onClearCart: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  onBackToShopping,
  onClearCart
}) => {
  const { subtotal, shippingFee, total } = calculateTotals(items);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [customCity, setCustomCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const majorCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Gujranwala',
    'Sialkot',
    'Hyderabad',
    'Abbottabad',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Other City'
  ];

  const selectedFinalCity = city === 'Other City' ? (customCity || 'Pakistan') : city;

  // METHOD 1: Website Checkout Submission
  const handleWebsiteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill out all required fields (Name, Phone, and Address).');
      return;
    }

    setSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ZK-${randomNum}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not Provided',
      address: address.trim(),
      city: selectedFinalCity,
      postalCode: postalCode.trim() || undefined,
      orderNotes: orderNotes.trim() || undefined,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor
      })),
      subtotal,
      shippingFee,
      total,
      status: 'Pending',
      paymentMethod: 'Cash on Delivery',
      createdAt: new Date().toISOString()
    };

    // Save order in persistent storage (and simulated backend)
    saveOrder(newOrder);

    setTimeout(() => {
      setSubmitting(false);
      setCompletedOrder(newOrder);
      onClearCart();
    }, 800);
  };

  // METHOD 2: Direct WhatsApp Order Submission
  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please provide at least your Name, Phone Number, and Address so we can generate your complete WhatsApp order slip.');
      return;
    }

    const waUrl = createCartWhatsAppUrl(items, {
      name: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: selectedFinalCity,
      notes: orderNotes.trim() || undefined
    });

    window.open(waUrl, '_blank');
  };

  const handleCopyOrderNumber = () => {
    if (!completedOrder) return;
    navigator.clipboard.writeText(completedOrder.orderNumber);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  // SUCCESS CONFIRMATION MODAL / SCREEN
  if (completedOrder) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto animate-fade-in">
        <div className="bg-[#12141e] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Alhamdulillah! Order Placed Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                Thank You, {completedOrder.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Your order is confirmed. Our dispatch team will verify and ship your timepiece via TCS/Leopards Courier with Open Parcel Check.
              </p>
            </div>
          </div>

          {/* Order Tracking Reference Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#181a28] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-[11px] text-slate-400 block">Your ZK.PK Order ID:</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 tracking-wider">
                {completedOrder.orderNumber}
              </span>
            </div>
            <button
              onClick={handleCopyOrderNumber}
              className="px-4 py-2 rounded-xl bg-[#232738] hover:bg-[#2c3147] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedOrderId ? 'Copied ID!' : 'Copy Order ID'}</span>
            </button>
          </div>

          {/* Order Details Receipt */}
          <div className="space-y-4 border-t border-white/10 pt-6 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Order Receipt Summary
            </h3>

            <div className="space-y-3">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-lg bg-[#161824]">
                  <div>
                    <span className="font-bold text-white block">{item.productName}</span>
                    <span className="text-slate-400 text-[11px]">
                      {item.brand} {item.color ? `· Variant: ${item.color}` : ''} · Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-amber-400 text-sm">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#161824] space-y-2 text-xs border border-white/5">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal:</span>
                <span>Rs. {completedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery Charges:</span>
                <span className="text-emerald-400 font-bold">
                  {completedOrder.shippingFee === 0 ? 'FREE' : `Rs. ${completedOrder.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total Amount to Pay on Delivery:</span>
                <span className="text-amber-400 text-lg">
                  Rs. {completedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Delivery Address Details */}
            <div className="p-4 rounded-xl bg-[#161824] text-xs text-slate-300 space-y-1">
              <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                Shipping Destination:
              </span>
              <div><strong>Receiver:</strong> {completedOrder.customerName} ({completedOrder.phone})</div>
              <div><strong>Address:</strong> {completedOrder.address}, {completedOrder.city}</div>
              {completedOrder.email && <div><strong>Email:</strong> {completedOrder.email}</div>}
              <div><strong>Payment:</strong> Cash on Delivery (COD)</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Assalam-o-Alaikum ZK.PK! I have just placed order ${completedOrder.orderNumber} on your website. My name is ${completedOrder.customerName}. Please confirm dispatch.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order Confirmation on WhatsApp ({DISPLAY_WHATSAPP})</span>
            </a>

            <button
              onClick={onBackToShopping}
              className="py-3 px-6 rounded-xl bg-[#1e2130] hover:bg-[#272b3e] text-white font-semibold text-xs transition-colors"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={onBackToShopping}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Watches</span>
        </button>
        <span>/</span>
        <span className="text-white font-semibold">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Checkout Methods & Details */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#12141f] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-6">
            
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold block">
                Cash On Delivery
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-luxury">
                Delivery & Contact Information
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your genuine address in Pakistan. Open parcel inspection is permitted before payment.
              </p>
            </div>

            <form onSubmit={handleWebsiteCheckout} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Customer Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Yaseen"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/70"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp / Mobile Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="0311-1234567 or +92311..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/70"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Rider will call this number before delivery</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/70"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">For order receipt & tracking updates</span>
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Complete Delivery Address <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House #, Street #, Mohallah / Sector / Phase / Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/70"
                />
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    City <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/70"
                  >
                    {majorCities.map((c) => (
                      <option key={c} value={c} className="bg-[#181a26] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {city === 'Other City' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Specify Your City <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your town / district"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/70"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 75500"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/70"
                    />
                  </div>
                )}
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Order Notes / Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver after 3:00 PM, Call before arriving"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/70"
                />
              </div>

              {/* METHOD 1 & 2 CTA Action Buttons */}
              <div className="pt-4 space-y-3">
                
                {/* Method 1: Website Checkout Button */}
                <button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Truck className="w-4 h-4" />
                  <span>
                    {submitting ? 'Confirming Your Order...' : `Method 1: Complete Website Order (Rs. ${total.toLocaleString()})`}
                  </span>
                </button>

                {/* Method 2: Direct WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  disabled={items.length === 0}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/30 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Method 2: Send Order Instantly to WhatsApp (+92 311 1089742)</span>
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-[#12141f] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 sticky top-28">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white font-luxury">
                Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
              </h3>
              <span className="text-xs text-amber-400 font-semibold">ZK.PK Guaranteed</span>
            </div>

            {/* Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}`}
                  className="flex gap-3 items-center p-2 rounded-xl bg-[#171a26] border border-white/5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-black shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">{item.product.brand}</span>
                    <span className="font-bold text-white truncate block">{item.product.name}</span>
                    <span className="text-[11px] text-slate-400 block">
                      Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-amber-400 text-right">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery (All Pakistan):</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-400 font-semibold">FREE (Order &gt; Rs. 1,999)</strong>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total Amount:</span>
                <span className="text-amber-400 text-xl font-black">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="p-3.5 rounded-xl bg-[#161926] border border-emerald-500/20 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Our 100% Customer Protection:</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                <li>Visual Open Parcel inspection allowed with rider</li>
                <li>Delivery time: 2 to 4 working days nationwide</li>
                <li>7-day replacement warranty for manufacturing defects</li>
                <li>Original packaging with protective cushion box</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

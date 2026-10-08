import React from 'react';
import { Shield, FileText, Truck, RefreshCw, ArrowLeft } from 'lucide-react';
import { DISPLAY_WHATSAPP, SUPPORT_EMAIL } from '../utils/orderHelper';

interface PolicyViewProps {
  type: 'privacy' | 'terms' | 'shipping' | 'return';
  onBackToShopping: () => void;
}

export const PolicyViews: React.FC<PolicyViewProps> = ({ type, onBackToShopping }) => {
  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                  Privacy Policy - ZK.PK
                </h1>
                <span className="text-xs text-slate-400">Effective Date: October 2026</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <p>
                At <strong>ZK.PK</strong> (accessible from https://zk.pk), our prime priority is the privacy of our visitors and customers across Pakistan. This Privacy Policy outlines the types of information collected and how we utilize it.
              </p>
              
              <h2 className="text-base font-bold text-white font-luxury pt-2">1. Information We Collect</h2>
              <p>
                When you place an order on our store, we collect details necessary to process Cash on Delivery shipments: your full name, mobile/WhatsApp telephone number, delivery address, city, and optional email.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">2. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To dispatch your watch parcel via domestic couriers (TCS, Leopards, Trax).</li>
                <li>To contact you for order verification and address confirmation via WhatsApp or phone call.</li>
                <li>To notify you about delivery tracking and status updates.</li>
                <li>We do NOT sell, lease, or rent customer personal information to third parties.</li>
              </ul>

              <h2 className="text-base font-bold text-white font-luxury pt-2">3. Cookies and Web Beacons</h2>
              <p>
                Like any other e-commerce site, ZK.PK uses cookies to store visitor preferences and optimize shopping cart states.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">4. Google AdSense & Third-Party Advertising</h2>
              <p>
                Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">5. Contact Our Privacy Officer</h2>
              <p>
                If you have questions regarding our privacy compliance, please email us at <strong>{SUPPORT_EMAIL}</strong> or WhatsApp at <strong>{DISPLAY_WHATSAPP}</strong>.
              </p>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                  Terms & Conditions - ZK.PK
                </h1>
                <span className="text-xs text-slate-400">Last Revised: October 2026</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <p>
                Welcome to <strong>ZK.PK</strong>. By accessing this website and purchasing our wristwatches, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">1. Exclusive Watch Retailer</h2>
              <p>
                ZK.PK is an exclusive online watch boutique. We only sell watches and horological accessories. All product descriptions, specifications, and prices in Pakistani Rupees (PKR) are kept strictly accurate.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">2. Order Acceptance & Pricing</h2>
              <p>
                We reserve the right to confirm order details via phone or WhatsApp prior to dispatch. All prices are listed in PKR inclusive of standard domestic taxes.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">3. Open Parcel Check Protocol</h2>
              <p>
                ZK.PK endorses open parcel visual inspection at delivery. Customers must inspect that the watch model, color, and condition match their order before settling the Cash on Delivery amount.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">4. Governing Law</h2>
              <p>
                These terms shall be governed by and constructed in accordance with the laws of the Islamic Republic of Pakistan.
              </p>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                  Shipping & Delivery Policy
                </h1>
                <span className="text-xs text-slate-400">Cash on Delivery across Pakistan</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <p>
                At <strong>ZK.PK</strong>, we deliver nationwide to all major cities, towns, and tehsils across Pakistan through top-tier courier services including <strong>TCS, Leopards Courier, and Trax Logistics</strong>.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">1. Delivery Timeline</h2>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Karachi:</strong> 1 to 2 business days.</li>
                <li><strong>Lahore, Islamabad, Rawalpindi, Faisalabad:</strong> 2 to 3 business days.</li>
                <li><strong>Other Cities & Remote Areas:</strong> 3 to 4 business days.</li>
              </ul>

              <h2 className="text-base font-bold text-white font-luxury pt-2">2. Shipping Charges</h2>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Free Shipping:</strong> On all orders above Rs. 1,999.</li>
                <li><strong>Standard Flat Rate:</strong> Rs. 150 only for smaller orders under Rs. 1,999.</li>
              </ul>

              <h2 className="text-base font-bold text-white font-luxury pt-2">3. Open Parcel Visual Inspection</h2>
              <p>
                Every ZK.PK parcel is dispatched with an open parcel clearance rider notice. When the courier arrives, you can visually verify that the correct watch is inside the packaging before handing over cash.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">4. Tracking Your Parcel</h2>
              <p>
                Once dispatched, our team sends your tracking number via SMS/WhatsApp so you can monitor your shipment in real time.
              </p>
            </div>
          </div>
        );

      case 'return':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                  Return & 7-Day Replacement Policy
                </h1>
                <span className="text-xs text-slate-400">Zero Hassle Customer Protection</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <p>
                Customer satisfaction is our utmost guarantee. We want you to wear your ZK.PK timepiece with absolute confidence and pride.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">1. 7-Day Replacement Guarantee</h2>
              <p>
                If your watch arrives with any mechanical fault, defective battery, cracked glass, or incorrect color, contact our WhatsApp support within 7 days of delivery for an instant replacement.
              </p>

              <h2 className="text-base font-bold text-white font-luxury pt-2">2. Conditions for Exchange</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Watch must be unworn and in original physical condition.</li>
                <li>Original protective plastics and watch box must be intact.</li>
                <li>Damage resulting from accidental dropping, water submergence beyond rated depth, or unauthorized opening is not covered.</li>
              </ul>

              <h2 className="text-base font-bold text-white font-luxury pt-2">3. Simple Return Process</h2>
              <p>
                Simply send a video or photo of the watch to our WhatsApp (+92 311 1089742). Our representative will arrange a replacement parcel without unnecessary delays.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
      <button
        onClick={onBackToShopping}
        className="mb-6 flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Watch Catalog</span>
      </button>

      <div className="bg-[#12141f] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
};

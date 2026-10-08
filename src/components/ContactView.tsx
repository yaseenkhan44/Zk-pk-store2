import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { DISPLAY_WHATSAPP, SUPPORT_EMAIL, WHATSAPP_NUMBER } from '../utils/orderHelper';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Send inquiry to WhatsApp as well for quick response
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`*WEBSITE INQUIRY - ZK.PK*\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
          Get In Touch With ZK.PK
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury">
          We're Here to Assist You
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light">
          Have an order inquiry, need watch styling advice, or wish to track an existing delivery? Our team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum ZK.PK! I need assistance with an order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-[#141724] border border-emerald-500/30 hover:border-emerald-400/60 block space-y-2 transition-all hover:shadow-xl group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              Instant WhatsApp Support
            </div>
            <div className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              {DISPLAY_WHATSAPP}
            </div>
            <p className="text-xs text-slate-400">
              Direct chat with owner & support staff. Average response time under 5 minutes.
            </p>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="p-6 rounded-2xl bg-[#141724] border border-white/10 hover:border-amber-400/40 block space-y-2 transition-all hover:shadow-xl group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Official Email
            </div>
            <div className="text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
              {SUPPORT_EMAIL}
            </div>
            <p className="text-xs text-slate-400">
              For corporate orders, bulk inquiries, or technical support.
            </p>
          </a>

          {/* Location & Hours */}
          <div className="p-6 rounded-2xl bg-[#141724] border border-white/10 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block text-sm">Main Dispatch Hub:</strong>
                Commercial Center, Phase 2 Ext, Karachi, Sindh, Pakistan.
                <span className="block text-slate-400 mt-1">
                  Deliveries routed nationwide via TCS, Leopards, and Trax.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-white/5">
              <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block text-sm">Support Working Hours:</strong>
                Monday to Sunday: 10:00 AM – 10:00 PM PST
              </div>
            </div>
          </div>

        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-[#12141f] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-bold text-white font-luxury">
            Send Us an Instant Inquiry
          </h2>
          <p className="text-xs text-slate-400">
            Fill the form below and we will automatically open WhatsApp with your inquiry pre-loaded.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tariq Mehmood"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                WhatsApp / Phone Number
              </label>
              <input
                type="tel"
                placeholder="0311-xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Message / Question <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="How can we help? (e.g. Is Naviforce Classic in stock? When will delivery reach Lahore?)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#181a26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Your message was sent. We will get back to you shortly.</span>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
};

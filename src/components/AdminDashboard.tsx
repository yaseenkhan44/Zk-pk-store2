import React, { useState, useEffect } from 'react';
import { 
  Package, ShoppingCart, Users, TrendingUp, CheckCircle, Clock, 
  Truck, AlertCircle, Edit, Trash2, Search, Plus, Save, RefreshCw, Download 
} from 'lucide-react';
import { Order, WatchProduct } from '../types';
import { getStoredOrders, updateOrderStatus } from '../utils/orderHelper';
import { WATCH_PRODUCTS } from '../data/products';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'stats'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<WatchProduct[]>(WATCH_PRODUCTS);
  const [searchOrder, setSearchOrder] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<WatchProduct | null>(null);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  // Stats
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.phone.includes(searchOrder) ||
      o.city.toLowerCase().includes(searchOrder.toLowerCase());
    const matchStatus = selectedStatus === 'All' || o.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchProduct.toLowerCase()) ||
    p.category.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  const handleToggleStock = (productId: string) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    }));
  };

  const exportOrdersCSV = () => {
    const headers = ['Order ID,Customer,Phone,City,Items,Total,Status,Date'];
    const rows = orders.map(o => 
      `"${o.orderNumber}","${o.customerName}","${o.phone}","${o.city}","${o.items.map(i => `${i.productName} x${i.quantity}`).join('; ')}",${o.total},"${o.status}","${new Date(o.createdAt).toLocaleDateString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ZK_PK_Orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
            Store Management Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
            ZK.PK Admin Dashboard
          </h1>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-2 bg-[#141624] p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-black shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'products'
                ? 'bg-amber-400 text-black shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Watch Inventory (40)
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'stats'
                ? 'bg-amber-400 text-black shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Sales Analytics
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141624] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Sales</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">All completed & booked orders</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141624] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {totalOrders}
          </div>
          <span className="text-[10px] text-slate-400">Cash on Delivery</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141624] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Dispatch</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400">
            {pendingOrders}
          </div>
          <span className="text-[10px] text-slate-400">Require courier booking</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141624] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Delivered Parcels</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            {deliveredOrders}
          </div>
          <span className="text-[10px] text-slate-400">Cash settled by courier</span>
        </div>
      </div>

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by Order ID, name, phone, city..."
                  value={searchOrder}
                  onChange={(e) => setSearchOrder(e.target.value)}
                  className="w-full bg-[#181a26] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#181a26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={exportOrdersCSV}
                className="px-3.5 py-2 rounded-xl bg-[#202336] hover:bg-[#282d45] border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-[#141624] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#181b2c] text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">City / Address</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total Bill</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No orders matching current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">
                          {order.orderNumber}
                          <span className="block text-[10px] text-slate-500 font-sans mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <strong className="text-white block">{order.customerName}</strong>
                          <span className="text-[11px] text-slate-400">{order.phone}</span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <span className="font-semibold text-white block">{order.city}</span>
                          <span className="text-[11px] text-slate-400 truncate block">{order.address}</span>
                        </td>
                        <td className="p-4">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="text-[11px]">
                              {it.productName} <span className="text-amber-400 font-bold">x{it.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-bold text-amber-400 text-sm">
                          Rs. {order.total.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border focus:outline-none ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                                : order.status === 'Shipped'
                                ? 'bg-sky-950/60 border-sky-500/40 text-sky-400'
                                : order.status === 'Confirmed'
                                ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                                : order.status === 'Cancelled'
                                ? 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                                : 'bg-slate-800 border-slate-600 text-slate-200'
                            }`}
                          >
                            <option value="Pending" className="bg-[#141624] text-white">Pending</option>
                            <option value="Confirmed" className="bg-[#141624] text-white">Confirmed</option>
                            <option value="Shipped" className="bg-[#141624] text-white">Shipped</option>
                            <option value="Delivered" className="bg-[#141624] text-white">Delivered</option>
                            <option value="Cancelled" className="bg-[#141624] text-white">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam-o-Alaikum ${order.customerName}! This is ZK.PK regarding your watch order ${order.orderNumber}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 inline-block"
                          >
                            WhatsApp Customer
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search watch by name, brand or category..."
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                className="w-full bg-[#181a26] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <span className="text-xs text-slate-400">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>

          <div className="bg-[#141624] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#181b2c] text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">Product Image & Name</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (PKR)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-black border border-white/10 shrink-0"
                        />
                        <div>
                          <strong className="text-white block">{p.name}</strong>
                          <span className="text-[10px] text-slate-500 font-mono">{p.id}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-amber-400">{p.brand}</td>
                      <td className="p-4 text-slate-300">{p.category}</td>
                      <td className="p-4 font-bold text-white text-sm">
                        Rs. {p.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            p.inStock
                              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                              : 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                          }`}
                        >
                          {p.inStock ? `In Stock (${p.stockCount})` : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="px-2.5 py-1 rounded bg-[#202336] hover:bg-[#282d45] text-amber-300 text-[11px] font-semibold border border-white/10"
                        >
                          Edit Price/Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* STATS TAB */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#141624] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-luxury">
              Catalog Pricing Distribution
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Rs. 999 Segment (10 Models)</span>
                <span className="font-bold text-amber-400">10 Watches</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Rs. 1,499 Segment (5 Models)</span>
                <span className="font-bold text-amber-400">5 Watches</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Rs. 1,799 Segment (5 Models)</span>
                <span className="font-bold text-amber-400">5 Watches</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Rs. 1,999 Segment (10 Models)</span>
                <span className="font-bold text-amber-400">10 Watches</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Rs. 2,499 Segment (5 Models)</span>
                <span className="font-bold text-amber-400">5 Watches</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Rs. 3,499 Segment (5 Models)</span>
                <span className="font-bold text-amber-400">5 Watches</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-white">
                <span>Total Catalog Size</span>
                <span className="text-emerald-400">40 Active Watch Models</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#141624] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-luxury">
              Courier Dispatch Information
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <strong>TCS Account Portal:</strong> Daily courier pickup at 4:30 PM PST from Karachi hub.
              </p>
              <p>
                <strong>Leopards COD System:</strong> Remittances released twice a week to business bank account.
              </p>
              <p>
                <strong>Open Parcel Stamp:</strong> Ensure every flyer bag is stamped with <em className="text-amber-400">"Customer is authorized to visually inspect before payment"</em>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#141624] border border-white/15 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white font-luxury">
              Edit Product: {editingProduct.name}
            </h3>

            <form onSubmit={handleSaveProductEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Price (PKR)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full bg-[#1c1f2f] border border-white/10 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Original / Compare Price (PKR)</label>
                <input
                  type="number"
                  value={editingProduct.originalPrice}
                  onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                  className="w-full bg-[#1c1f2f] border border-white/10 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Stock Count</label>
                <input
                  type="number"
                  value={editingProduct.stockCount}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                  className="w-full bg-[#1c1f2f] border border-white/10 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-[#1c1f2f] border border-white/10 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-amber-400 text-black font-bold text-xs"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

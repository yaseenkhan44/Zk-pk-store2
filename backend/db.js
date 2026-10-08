/**
 * ZK.PK - Backend Database & Storage Layer
 * In-memory state initialized with all 40 watches and sample orders.
 * Easily swappable with MongoDB, PostgreSQL, or SQLite.
 */

const INITIAL_WATCHES = [
  // 10 at Rs. 999
  { id: 'zk-01', name: 'SKMEI 1251 Classic Digital Sport', brand: 'SKMEI', price: 999, originalPrice: 1599, category: "Men's Watches", inStock: true, stockCount: 42, rating: 4.8, reviewCount: 124 },
  { id: 'zk-02', name: 'Curren Minimalist White Dial', brand: 'Curren', price: 999, originalPrice: 1699, category: 'Classic Watches', inStock: true, stockCount: 35, rating: 4.7, reviewCount: 88 },
  { id: 'zk-03', name: 'Naviforce Ultra-Slim Quartz', brand: 'Naviforce', price: 999, originalPrice: 1799, category: 'Casual Watches', inStock: true, stockCount: 28, rating: 4.6, reviewCount: 65 },
  { id: 'zk-04', name: 'OLEVS Casual Leather Classic', brand: 'OLEVS', price: 999, originalPrice: 1550, category: 'Classic Watches', inStock: true, stockCount: 19, rating: 4.7, reviewCount: 52 },
  { id: 'zk-05', name: 'Poedagar Slim Line Black', brand: 'Poedagar', price: 999, originalPrice: 1699, category: "Men's Watches", inStock: true, stockCount: 31, rating: 4.9, reviewCount: 94 },
  { id: 'zk-06', name: 'Megir Clean Executive Quartz', brand: 'Megir', price: 999, originalPrice: 1750, category: 'Classic Watches', inStock: true, stockCount: 22, rating: 4.5, reviewCount: 43 },
  { id: 'zk-07', name: 'LIGE Slimline Black Mesh', brand: 'LIGE', price: 999, originalPrice: 1850, category: 'Casual Watches', inStock: true, stockCount: 38, rating: 4.8, reviewCount: 110 },
  { id: 'zk-08', name: 'T-Winner Classic Leather Dress', brand: 'T-Winner', price: 999, originalPrice: 1600, category: 'Classic Watches', inStock: true, stockCount: 17, rating: 4.6, reviewCount: 37 },
  { id: 'zk-09', name: 'BENYAR Modern Simple Silver', brand: 'BENYAR', price: 999, originalPrice: 1800, category: "Men's Watches", inStock: true, stockCount: 26, rating: 4.7, reviewCount: 61 },
  { id: 'zk-10', name: 'Forsining Minimalist Vintage', brand: 'Forsining', price: 999, originalPrice: 1700, category: 'Casual Watches', inStock: true, stockCount: 21, rating: 4.6, reviewCount: 45 },

  // 5 at Rs. 1,499
  { id: 'zk-11', name: 'SKMEI Dual Time Rugged Military', brand: 'SKMEI', price: 1499, originalPrice: 2200, category: "Men's Watches", inStock: true, stockCount: 30, rating: 4.8, reviewCount: 140 },
  { id: 'zk-12', name: 'Curren Royal Blue Dial Steel', brand: 'Curren', price: 1499, originalPrice: 2350, category: 'Luxury Watches', inStock: true, stockCount: 25, rating: 4.9, reviewCount: 105 },
  { id: 'zk-13', name: 'Naviforce Day-Date Leather Field', brand: 'Naviforce', price: 1499, originalPrice: 2400, category: 'Casual Watches', inStock: true, stockCount: 18, rating: 4.7, reviewCount: 79 },
  { id: 'zk-14', name: 'Poedagar Gentleman Emerald Dial', brand: 'Poedagar', price: 1499, originalPrice: 2299, category: 'Luxury Watches', inStock: true, stockCount: 34, rating: 4.9, reviewCount: 162 },
  { id: 'zk-15', name: 'OLEVS Classic Roman Numeral Gold', brand: 'OLEVS', price: 1499, originalPrice: 2300, category: 'Classic Watches', inStock: true, stockCount: 20, rating: 4.8, reviewCount: 91 },

  // 5 at Rs. 1,799
  { id: 'zk-16', name: 'LIGE Sport Tachymeter Quartz', brand: 'LIGE', price: 1799, originalPrice: 2699, category: 'Chronograph Watches', inStock: true, stockCount: 27, rating: 4.8, reviewCount: 118 },
  { id: 'zk-17', name: 'Megir Pilot Leather Chrono', brand: 'Megir', price: 1799, originalPrice: 2750, category: 'Chronograph Watches', inStock: true, stockCount: 16, rating: 4.7, reviewCount: 84 },
  { id: 'zk-18', name: 'BENYAR Nautical Steel Chronograph', brand: 'BENYAR', price: 1799, originalPrice: 2850, category: 'Chronograph Watches', inStock: true, stockCount: 22, rating: 4.9, reviewCount: 132 },
  { id: 'zk-19', name: 'Curren Chrono Sport Blackout', brand: 'Curren', price: 1799, originalPrice: 2600, category: "Men's Watches", inStock: true, stockCount: 35, rating: 4.8, reviewCount: 97 },
  { id: 'zk-20', name: 'SKMEI Stainless Chrono Master', brand: 'SKMEI', price: 1799, originalPrice: 2700, category: 'Casual Watches', inStock: true, stockCount: 19, rating: 4.6, reviewCount: 68 },

  // 10 at Rs. 1,999
  { id: 'zk-21', name: 'Naviforce Classic Multi-Function', brand: 'Naviforce', price: 1999, originalPrice: 2999, category: "Men's Watches", inStock: true, stockCount: 45, rating: 4.9, reviewCount: 210 },
  { id: 'zk-22', name: 'Curren Premium Chronograph Steel', brand: 'Curren', price: 1999, originalPrice: 3200, category: 'Chronograph Watches', inStock: true, stockCount: 38, rating: 4.9, reviewCount: 185 },
  { id: 'zk-23', name: 'Poedagar Luxury Royal Date', brand: 'Poedagar', price: 1999, originalPrice: 3100, category: 'Luxury Watches', inStock: true, stockCount: 29, rating: 4.8, reviewCount: 142 },
  { id: 'zk-24', name: 'LIGE Premium Golden Diver', brand: 'LIGE', price: 1999, originalPrice: 3300, category: 'Luxury Watches', inStock: true, stockCount: 31, rating: 4.9, reviewCount: 167 },
  { id: 'zk-25', name: 'OLEVS Classic Diamond Dial', brand: 'OLEVS', price: 1999, originalPrice: 2950, category: 'Classic Watches', inStock: true, stockCount: 22, rating: 4.7, reviewCount: 115 },
  { id: 'zk-26', name: 'BENYAR Chronograph Oak Sport', brand: 'BENYAR', price: 1999, originalPrice: 3400, category: 'Chronograph Watches', inStock: true, stockCount: 26, rating: 4.9, reviewCount: 174 },
  { id: 'zk-27', name: 'Forsining Vintage Automatic', brand: 'Forsining', price: 1999, originalPrice: 3200, category: 'Automatic Watches', inStock: true, stockCount: 15, rating: 4.8, reviewCount: 96 },
  { id: 'zk-28', name: 'Megir Chronograph Silicon Sport', brand: 'Megir', price: 1999, originalPrice: 3000, category: 'Casual Watches', inStock: true, stockCount: 34, rating: 4.7, reviewCount: 89 },
  { id: 'zk-29', name: 'T-Winner Automatic Mesh Skeleton', brand: 'T-Winner', price: 1999, originalPrice: 3350, category: 'Automatic Watches', inStock: true, stockCount: 18, rating: 4.8, reviewCount: 112 },
  { id: 'zk-30', name: 'SKMEI Classic Steel Diver 200M', brand: 'SKMEI', price: 1999, originalPrice: 2899, category: "Men's Watches", inStock: true, stockCount: 27, rating: 4.8, reviewCount: 104 },

  // 5 at Rs. 2,499
  { id: 'zk-31', name: 'Naviforce Heavyweight Military Steel', brand: 'Naviforce', price: 2499, originalPrice: 3800, category: "Men's Watches", inStock: true, stockCount: 23, rating: 4.9, reviewCount: 156 },
  { id: 'zk-32', name: 'Curren Aviator Precision Chrono', brand: 'Curren', price: 2499, originalPrice: 3950, category: 'Chronograph Watches', inStock: true, stockCount: 19, rating: 4.9, reviewCount: 139 },
  { id: 'zk-33', name: 'LIGE Moonphase Perpetual Steel', brand: 'LIGE', price: 2499, originalPrice: 4200, category: 'Luxury Watches', inStock: true, stockCount: 24, rating: 4.9, reviewCount: 188 },
  { id: 'zk-34', name: 'Poedagar Swiss-Inspired Chrono', brand: 'Poedagar', price: 2499, originalPrice: 3899, category: 'Luxury Watches', inStock: true, stockCount: 16, rating: 4.8, reviewCount: 120 },
  { id: 'zk-35', name: 'BENYAR Luxury Panda Chronograph', brand: 'BENYAR', price: 2499, originalPrice: 4100, category: 'Chronograph Watches', inStock: true, stockCount: 22, rating: 5.0, reviewCount: 204 },

  // 5 at Rs. 3,499
  { id: 'zk-36', name: 'Forsining Automatic Skeleton Gold', brand: 'Forsining', price: 3499, originalPrice: 5200, category: 'Automatic Watches', inStock: true, stockCount: 14, rating: 4.9, reviewCount: 176 },
  { id: 'zk-37', name: 'T-Winner Mechanical Skeleton Luxury', brand: 'T-Winner', price: 3499, originalPrice: 5500, category: 'Automatic Watches', inStock: true, stockCount: 12, rating: 4.9, reviewCount: 148 },
  { id: 'zk-38', name: 'OLEVS Automatic Mechanical Sun & Moon', brand: 'OLEVS', price: 3499, originalPrice: 5800, category: 'Automatic Watches', inStock: true, stockCount: 16, rating: 5.0, reviewCount: 230 },
  { id: 'zk-39', name: 'BENYAR Automatic Ocean Heritage', brand: 'BENYAR', price: 3499, originalPrice: 5400, category: 'Automatic Watches', inStock: true, stockCount: 15, rating: 4.9, reviewCount: 195 },
  { id: 'zk-40', name: 'Poedagar Royal Tourbillon-Style Automatic', brand: 'Poedagar', price: 3499, originalPrice: 5999, category: 'Luxury Watches', inStock: true, stockCount: 11, rating: 5.0, reviewCount: 245 }
];

let productsDb = [...INITIAL_WATCHES];
let ordersDb = [
  {
    id: 'ord-101',
    orderNumber: 'ZK-89412',
    customerName: 'Hamza Tariq',
    phone: '+92 300 1234567',
    email: 'hamza@example.com',
    address: 'House # 42, Street 8, Phase 5, DHA',
    city: 'Lahore',
    items: [{ productId: 'zk-21', productName: 'Naviforce Classic Multi-Function', brand: 'Naviforce', price: 1999, quantity: 1 }],
    subtotal: 1999,
    shippingFee: 0,
    total: 1999,
    status: 'Shipped',
    paymentMethod: 'Cash on Delivery',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  }
];

export const getProducts = () => productsDb;
export const getProductById = (id) => productsDb.find(p => p.id === id);
export const updateProduct = (id, data) => {
  const index = productsDb.findIndex(p => p.id === id);
  if (index !== -1) {
    productsDb[index] = { ...productsDb[index], ...data };
    return productsDb[index];
  }
  return null;
};

export const getOrders = () => ordersDb;
export const addOrder = (order) => {
  ordersDb.unshift(order);
  return order;
};
export const updateOrderStatusInDb = (id, status) => {
  const order = ordersDb.find(o => o.id === id || o.orderNumber === id);
  if (order) {
    order.status = status;
    return order;
  }
  return null;
};

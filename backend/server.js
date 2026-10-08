/**
 * ZK.PK - Official Backend API Server
 * Running on Node.js / Express
 * Provides endpoints for Products, Orders, Customers, Inventory Stock & Business Analytics.
 */

import express from 'express';
import { 
  getProducts, 
  getProductById, 
  updateProduct, 
  getOrders, 
  addOrder, 
  updateOrderStatusInDb 
} from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS headers for local/cross-origin frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', store: 'ZK.PK', country: 'Pakistan', currency: 'PKR' });
});

// ==========================================
// 1. PRODUCTS ENDPOINTS
// ==========================================
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice } = req.query;
  let list = getProducts();

  if (category && category !== 'All') {
    list = list.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    list = list.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    list = list.filter(p => p.price <= Number(maxPrice));
  }

  res.json({ success: true, count: list.length, products: list });
});

app.get('/api/products/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Watch product not found' });
  }
  res.json({ success: true, product });
});

app.put('/api/products/:id', (req, res) => {
  const updated = updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product: updated });
});

// ==========================================
// 2. ORDERS ENDPOINTS (Method 1 & Method 2)
// ==========================================
app.get('/api/orders', (req, res) => {
  const { status } = req.query;
  let orders = getOrders();
  if (status && status !== 'All') {
    orders = orders.filter(o => o.status === status);
  }
  res.json({ success: true, count: orders.length, orders });
});

app.post('/api/orders', (req, res) => {
  const { customerName, phone, email, address, city, items, subtotal, shippingFee, total, paymentMethod } = req.body;

  if (!customerName || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing mandatory fields: customerName, phone, address, and items are required.' 
    });
  }

  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber: `ZK-${randomNum}`,
    customerName,
    phone,
    email: email || '',
    address,
    city: city || 'Pakistan',
    items,
    subtotal: subtotal || items.reduce((acc, it) => acc + it.price * it.quantity, 0),
    shippingFee: shippingFee !== undefined ? shippingFee : (subtotal > 1999 ? 0 : 150),
    total: total || (subtotal + (shippingFee || 0)),
    status: 'Pending',
    paymentMethod: paymentMethod || 'Cash on Delivery',
    createdAt: new Date().toISOString()
  };

  const saved = addOrder(newOrder);
  res.status(201).json({ 
    success: true, 
    message: 'Order created successfully. Prepare for courier booking.', 
    order: saved 
  });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid order status value.' });
  }

  const updated = updateOrderStatusInDb(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  res.json({ success: true, message: `Order status updated to ${status}.`, order: updated });
});

// ==========================================
// 3. STATS & ANALYTICS ENDPOINT
// ==========================================
app.get('/api/stats', (req, res) => {
  const orders = getOrders();
  const products = getProducts();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  res.json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalProducts: products.length,
      inStockCount: products.filter(p => p.inStock).length
    }
  });
});

// ==========================================
// 4. CONTACT INQUIRY ENDPOINT
// ==========================================
app.post('/api/contact', (req, res) => {
  const { name, phone, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Name and message are required.' });
  }

  console.log(`[ZK.PK Contact Inquiry] Name: ${name}, Phone: ${phone}, Message: ${message}`);
  res.json({ success: true, message: 'Inquiry received. Support team will respond shortly.' });
});

// Start backend
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`ZK.PK Backend Server listening on http://localhost:${PORT}`);
  });
}

export default app;

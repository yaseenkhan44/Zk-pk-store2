/**
 * ZK.PK - Official Client Script
 * Handles Cart, LocalStorage, WhatsApp Ordering, and UI Interactions
 */

const WHATSAPP_PHONE = '923111089742';
const CART_STORAGE_KEY = 'zk_pk_cart_v1';

// Cart Utility
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

function addToCart(productId, quantity = 1, color = 'Standard') {
  if (typeof WATCH_PRODUCTS === 'undefined') return;
  const product = WATCH_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(i => i.product.id === productId && i.color === color);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity, color });
  }
  saveCart(cart);
  alert(`Added "${product.name}" to cart!`);
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((acc, i) => acc + i.quantity, 0);
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(b => {
    b.textContent = total;
  });
}

// WhatsApp URL Generators
function getWhatsAppSingleUrl(product, quantity = 1, color = '') {
  const itemTotal = product.price * quantity;
  const shipping = itemTotal > 1999 ? 0 : 150;
  const grandTotal = itemTotal + shipping;

  const msg = [
    `*ASSALAM-O-ALAIKUM ZK.PK!*`,
    `I want to order this watch from your website:`,
    '',
    `*Product:* ${product.name}`,
    `*Brand:* ${product.brand}`,
    color ? `*Variant:* ${color}` : '',
    `*Price:* Rs. ${product.price.toLocaleString()}`,
    `*Quantity:* ${quantity}`,
    `*Total Payable:* Rs. ${grandTotal.toLocaleString()}`,
    `*Delivery:* ${shipping === 0 ? 'FREE Cash on Delivery' : 'Rs. 150 COD'}`,
    '',
    `*Please send to my address:*`,
    `Name: `,
    `Phone: `,
    `Address: `,
    `City: `
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

function getWhatsAppCartUrl(customerData) {
  const cart = getCart();
  if (cart.length === 0) return '';

  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal > 1999 ? 0 : 150;
  const total = subtotal + shipping;

  const itemsText = cart.map((i, idx) => 
    `${idx + 1}. *${i.product.name}* (Qty: ${i.quantity}) = Rs. ${(i.product.price * i.quantity).toLocaleString()}`
  ).join('\n');

  const msg = [
    `*NEW ORDER - ZK.PK*`,
    `Website: https://zk.pk`,
    '',
    `*--- CUSTOMER ---*`,
    `*Name:* ${customerData.name}`,
    `*Phone:* ${customerData.phone}`,
    `*Address:* ${customerData.address}`,
    `*City:* ${customerData.city}`,
    '',
    `*--- ITEMS ---*`,
    itemsText,
    '',
    `*Subtotal:* Rs. ${subtotal.toLocaleString()}`,
    `*Shipping:* ${shipping === 0 ? 'FREE' : 'Rs. ' + shipping}`,
    `*Total Payable:* Rs. ${total.toLocaleString()}`,
    `*Payment:* Cash on Delivery (COD)`
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

// Initial script execution on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

import { CartItem, Order, WatchProduct } from '../types';

export const WHATSAPP_NUMBER = '923111089742';
export const DISPLAY_WHATSAPP = '+92 311 1089742';
export const SUPPORT_EMAIL = 'yaseenali22235@gmail.com';
export const STORE_NAME = 'ZK.PK';

// Calculate order totals
export const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  // Free delivery for orders above Rs. 1,999, else Rs. 150 standard delivery in Pakistan
  const shippingFee = subtotal > 1999 || items.length >= 2 ? 0 : 150;
  const total = subtotal + shippingFee;
  return { subtotal, shippingFee, total };
};

// Generate WhatsApp order URL for single product instant buy
export const createSingleProductWhatsAppUrl = (
  product: WatchProduct,
  quantity: number = 1,
  color?: string,
  customerData?: { name?: string; phone?: string; address?: string; city?: string }
) => {
  const itemTotal = product.price * quantity;
  const shipping = itemTotal > 1999 ? 0 : 150;
  const grandTotal = itemTotal + shipping;

  const lines = [
    `*ASSALAM-O-ALAIKUM ${STORE_NAME}!*`,
    `I would like to place an order from your website:`,
    '',
    `*--- ORDER DETAILS ---*`,
    `*Product:* ${product.name}`,
    `*Brand:* ${product.brand}`,
    color ? `*Color / Variant:* ${color}` : '',
    `*Price:* Rs. ${product.price.toLocaleString()}`,
    `*Quantity:* ${quantity}`,
    `*Item Subtotal:* Rs. ${itemTotal.toLocaleString()}`,
    `*Delivery Charges:* ${shipping === 0 ? 'FREE DELIVERY' : `Rs. ${shipping}`}`,
    `*Total Payable:* Rs. ${grandTotal.toLocaleString()}`,
    '',
    customerData?.name ? `*Customer Name:* ${customerData.name}` : '*Customer Name:* [Please provide]',
    customerData?.phone ? `*Phone Number:* ${customerData.phone}` : '*Phone Number:* [Please provide]',
    customerData?.address ? `*Full Address:* ${customerData.address}` : '*Full Address:* [Please provide]',
    customerData?.city ? `*City:* ${customerData.city}` : '*City:* [Please provide]',
    '',
    `*Payment Method:* Cash on Delivery (COD)`,
    `*Website:* ${STORE_NAME} (https://zk.pk)`,
    `Please confirm my order. Thank you!`
  ].filter(line => line !== '');

  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Generate WhatsApp URL for entire Cart checkout
export const createCartWhatsAppUrl = (
  items: CartItem[],
  customerData: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  }
) => {
  const { subtotal, shippingFee, total } = calculateTotals(items);

  const itemLines = items.map((item, idx) => {
    return `${idx + 1}. *${item.product.name}* (${item.selectedColor || 'Standard'})\n   Qty: ${item.quantity} x Rs. ${item.product.price.toLocaleString()} = Rs. ${(item.product.price * item.quantity).toLocaleString()}`;
  }).join('\n');

  const lines = [
    `*NEW ORDER - ${STORE_NAME}*`,
    `Website: https://zk.pk`,
    '',
    `*--- CUSTOMER DETAILS ---*`,
    `*Name:* ${customerData.name}`,
    `*Phone:* ${customerData.phone}`,
    `*Address:* ${customerData.address}`,
    `*City:* ${customerData.city}`,
    customerData.notes ? `*Special Notes:* ${customerData.notes}` : '',
    '',
    `*--- ORDER ITEMS ---*`,
    itemLines,
    '',
    `*--- BILLING SUMMARY ---*`,
    `*Subtotal:* Rs. ${subtotal.toLocaleString()}`,
    `*Shipping:* ${shippingFee === 0 ? 'FREE DELIVERY' : `Rs. ${shippingFee}`}`,
    `*Total Bill:* Rs. ${total.toLocaleString()}`,
    `*Payment Method:* Cash on Delivery (COD)`,
    '',
    `Please confirm the order dispatch. JazakAllah!`
  ].filter(line => line !== '');

  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// LocalStorage Cart Management
const CART_STORAGE_KEY = 'zk_pk_cart_v1';
const ORDERS_STORAGE_KEY = 'zk_pk_orders_v1';

export const getStoredCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveStoredCart = (cart: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Could not save cart', e);
  }
};

export const getStoredOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!data) {
      // Seed a couple initial demo orders for the Admin management view
      const demoOrders: Order[] = [
        {
          id: 'ord-101',
          orderNumber: 'ZK-89412',
          customerName: 'Hamza Tariq',
          phone: '+92 300 1234567',
          email: 'hamza@example.com',
          address: 'House # 42, Street 8, Phase 5, DHA',
          city: 'Lahore',
          postalCode: '54000',
          items: [
            {
              productId: 'zk-21',
              productName: 'Naviforce Classic Multi-Function',
              brand: 'Naviforce',
              price: 1999,
              quantity: 1,
              color: 'Black Steel / Gold Hands'
            }
          ],
          subtotal: 1999,
          shippingFee: 0,
          total: 1999,
          status: 'Shipped',
          paymentMethod: 'Cash on Delivery',
          createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
        },
        {
          id: 'ord-102',
          orderNumber: 'ZK-89413',
          customerName: 'Muhammad Bilal Khan',
          phone: '+92 321 9876543',
          email: 'bilal@example.com',
          address: 'Apartment 4B, Clifton Block 2',
          city: 'Karachi',
          postalCode: '75500',
          items: [
            {
              productId: 'zk-36',
              productName: 'Forsining Automatic Skeleton Gold',
              brand: 'Forsining',
              price: 3499,
              quantity: 1,
              color: 'Imperial Gold Steel'
            }
          ],
          subtotal: 3499,
          shippingFee: 0,
          total: 3499,
          status: 'Confirmed',
          paymentMethod: 'Cash on Delivery',
          createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
        }
      ];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(demoOrders));
      return demoOrders;
    }
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order) => {
  try {
    const orders = getStoredOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Could not save order', e);
  }
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  try {
    const orders = getStoredOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

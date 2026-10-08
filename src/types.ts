export interface WatchProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: 'Men\'s Watches' | 'Luxury Watches' | 'Chronograph Watches' | 'Automatic Watches' | 'Casual Watches' | 'Classic Watches';
  image: string;
  additionalImages?: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: {
    movement: string;
    caseDiameter: string;
    waterResistance: string;
    strapMaterial: string;
    glassType: string;
    dialColor: string;
    warranty: string;
  };
  colors: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: WatchProduct;
  quantity: number;
  selectedColor?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  items: {
    productId: string;
    productName: string;
    brand: string;
    price: number;
    quantity: number;
    color?: string;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Cash on Delivery' | 'WhatsApp Direct';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

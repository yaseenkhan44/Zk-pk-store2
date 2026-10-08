# ZK.PK - Premium Watches Pakistan (E-Commerce Store)

**ZK.PK** is a high-performance, professional watch-only e-commerce website designed with Shopify-level luxury aesthetics, dark obsidian & champagne gold typography, nationwide Cash on Delivery (COD), open parcel inspection guarantee, and direct WhatsApp order automation.

---

## 📌 Business & Store Information
- **Store Name:** ZK.PK
- **Niche:** Exclusively Premium Wristwatches (Strictly watches only)
- **WhatsApp Support:** `+92 311 1089742`
- **Email:** `yaseenali22235@gmail.com`
- **Currency:** PKR (Pakistani Rupee - Rs.)
- **Country:** Pakistan
- **Payment Method:** Cash on Delivery (COD) across Pakistan

---

## ⌚ Product Catalog Breakdown (Exactly 40 Watches)
All 40 watch models are individually distinct with realistic brand names, high-resolution imagery, full specifications, and exact pricing distribution:

| Price Tier | Quantity | Brand Examples |
|---|---|---|
| **Rs. 999** | **10 Watches** | SKMEI 1251, Curren Minimalist White, Naviforce Ultra-Slim, Poedagar Slim Line, OLEVS Casual Leather, Megir Executive, LIGE Slim Mesh, T-Winner Leather, BENYAR Simple Silver, Forsining Vintage |
| **Rs. 1,499** | **5 Watches** | SKMEI Dual Time Rugged, Curren Royal Blue Dial, Naviforce Day-Date Field, Poedagar Emerald Dial, OLEVS Roman Gold |
| **Rs. 1,799** | **5 Watches** | LIGE Sport Tachymeter, Megir Pilot Leather, BENYAR Nautical Steel, Curren Chrono Sport Blackout, SKMEI Chrono Master |
| **Rs. 1,999** | **10 Watches** | Naviforce Classic Multi-Function, Curren Premium Chronograph, Poedagar Luxury Royal Date, LIGE Golden Diver, OLEVS Diamond Dial, BENYAR Oak Sport, Forsining Vintage Automatic, Megir Silicon Sport, T-Winner Skeleton, SKMEI Steel Diver |
| **Rs. 2,499** | **5 Watches** | Naviforce Heavyweight Military, Curren Aviator Precision, LIGE Moonphase Perpetual, Poedagar Swiss-Inspired, BENYAR Panda Chrono |
| **Rs. 3,499** | **5 Watches** | Forsining Automatic Skeleton Gold, T-Winner Mechanical Skeleton, OLEVS Sun & Moon Mechanical, BENYAR Automatic Ocean Heritage, Poedagar Royal Tourbillon Automatic |

**Total:** **40 Watches** (10 + 5 + 5 + 10 + 5 + 5 = 40)

---

## 🚀 Two Working Order Methods

### Method 1: Website Checkout
- Collects: Customer Name, Phone, Address, City (with major Pakistani cities pre-populated), Postal code, and notes.
- Generates an instant official Order ID (e.g. `ZK-89412`).
- Saves order in persistent local storage and backend API.
- Displays full invoice receipt with delivery breakdown.

### Method 2: Direct WhatsApp Order
- Automatically pre-formats an order message and launches WhatsApp directly to **+923111089742**:
  - Customer Name & Phone
  - Delivery Address & City
  - Watch Name & Brand
  - Selected Variant / Color
  - Price & Quantity
  - Total Bill & COD verification
  - Website reference `ZK.PK`

---

## 📁 File Structure

```
├── index.html               # Main Entry / SPA Root
├── products.html            # Standalone 40 Watches Grid
├── product.html             # Standalone Single Watch Detail Page
├── cart.html                # Standalone Shopping Cart Page
├── checkout.html            # Standalone 2-Method Checkout Page
├── about.html               # Standalone About Us Page
├── contact.html             # Standalone Contact Us & Inquiry Page
├── blog.html                # Standalone Watch Guides & Horology Blog
├── privacy-policy.html      # AdSense-compliant Privacy Policy
├── terms.html               # Terms & Conditions
├── shipping-policy.html     # Domestic COD & Courier Policy
├── return-policy.html       # 7-Day Replacement Policy
├── style.css                # Standalone CSS Theme
├── script.js                # Standalone Vanilla JS Cart & WhatsApp Engine
├── products.js              # Standalone 40 Watches Dataset
├── robots.txt               # SEO Crawl Directive
├── sitemap.xml              # XML Sitemap for Search Engines
│
├── backend/
│   ├── server.js            # Express API Server (Products, Orders, Stats)
│   └── db.js                # Database Mock & In-Memory Store
│
└── src/                     # Interactive React SPA Version
    ├── App.tsx              # Master App with View Routing & Cart State
    ├── data/products.ts     # 40 Products TypeScript Dataset
    ├── data/blog.ts         # 5 Horology Articles
    ├── data/reviews.ts      # Customer Reviews Dataset
    ├── components/
    │   ├── Navbar.tsx
    │   ├── HeroSection.tsx
    │   ├── CategorySection.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductDetailsModal.tsx
    │   ├── CartDrawer.tsx
    │   ├── CheckoutView.tsx
    │   ├── AdminDashboard.tsx
    │   ├── BlogView.tsx
    │   ├── AboutView.tsx
    │   ├── ContactView.tsx
    │   ├── PolicyViews.tsx
    │   └── Footer.tsx
    └── utils/orderHelper.ts # WhatsApp URL Generators & Storage
```

---

## 🛠️ How to Run & Edit in VS Code

### 1. Running the Interactive Vite / React Store
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Running the Express Backend Server
```bash
node backend/server.js
```
The backend API runs on `http://localhost:5000`:
- `GET /api/products` (Filters by category, search, min/max price)
- `POST /api/orders` (Books a new website order)
- `GET /api/stats` (Revenue, pending orders, and catalog metrics)

### 3. Editing Watch Data (Images, Prices, Stock)
- For the interactive React app: Edit `src/data/products.ts`.
- For the standalone HTML pages: Edit `products.js`.
All images are hosted via high-speed Unsplash CDN and can easily be replaced with your own product photography URLs.

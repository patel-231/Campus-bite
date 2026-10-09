# Campus Bite — College Food Ordering Platform Redesign

A food-ordering platform engineered for college students and canteen operations at **Silver Oak University**.

---

## 1. Project Highlights & What Was Preserved & Upgraded

### Preserved Genuine Business Assets
* **Full Product Catalogue**: Preserved all original products from `review.js` and `index.html` with accurate student pricing (₹50–₹80):
  * **Indian Street Food**: Vada Pav (₹50), Samosa (2 pcs, ₹50), Manchurian Cheese Frankie (₹50)
  * **Burgers & Sandwiches**: Grilled Cheese Sandwich (₹50), Mexican Burger (₹50)
  * **Snacks & Puffs**: Cheese Fan Fries (₹50), Classic Cheese Nachos (₹50), Classic Cheese Maggi (₹50), Crispy Veg. Puff (₹50), Veg. Mayo Puff (₹50)
  * **Beverages**: Vanilla Cold Coffee (₹50), Blueberry Cold Coffee (₹50), Lemon Iced Tea (₹50)
  * **Desserts**: Brownie with Ice Cream (₹80)
* **Verified Contact Information**:
  * Phone: `+91 97128 71557` (Direct clickable telephone & WhatsApp link)
  * Email: `2202021000377@silveroakuni.ac.in` (Clickable mailto link)
  * Location: Silver Oak University Campus, Near Gota Cross Road, S.G. Highway, Ahmedabad, Gujarat 382481
  * Operating Hours: Monday – Saturday: 9:00 AM – 7:30 PM
* **Authentic Customer Reviews**:
  * Aditi R. ("The food was delivered hot and fresh, just as promised.")
  * Rajesh K. ("The variety on the menu is fantastic.")
  * Neha M. ("User-friendly website and reliable delivery service.")
  * Dynamic new review submission form with instant live publishing.

---

## 2. Design System Tokens
* **Primary Orange**: `#FF6B35`
* **Deep Orange**: `#E95420`
* **Warm Cream**: `#FFF8F1`
* **Surface White**: `#FFFFFF`
* **Dark Charcoal**: `#202124`
* **Secondary Text**: `#777777`
* **Light Border**: `#EAEAEA`
* **Success Green**: `#238636`
* **Error Red**: `#D93025`
* **Typography**: Outfit (Headings) & Plus Jakarta Sans (Body), with tabular numbers (`tabular-nums`) for currency and metrics.

---

## 3. Architecture & Features

1. **Top Bar Contract**: Brand wordmark (`CampusBite`), single-line navigation links, quick cart tray trigger with live count badge, student login indicator, and staff portal link.
2. **Hero Section**: High-contrast, commercial food spread photography, student discount pill-free trust markers, and fast CTA routing.
3. **Category Navigation & Filtering**: Segmented controls with live counts across all categories.
4. **Interactive Menu**: Debounced instant search, price slider, in-stock filter, multi-criteria sorting (Price, Name, Popularity), and Quick View modal.
5. **Slide-over Cart Tray**: Subtotal calculation, student coupon code `CAMPUSBITE10` (10% student discount), quantity steppers, and localStorage persistence.
6. **Checkout Flow**: Real student name and phone validation, campus collection mode (Counter Pickup vs. Campus Delivery), campus location picker (Blocks, Library, Hostels), and Order Reference Number generation.
7. **Redesigned Contact Page**: Premium 2-column layout with verified university contact information, one-click WhatsApp button, validated contact form, and FAQ accordion.
8. **Student Portal / Account**: Order history with live preparation status (`Pending` -> `Confirmed` -> `Preparing` -> `Ready for Pickup` -> `Completed`), saved favorite snacks, and profile manager.
9. **Staff / Admin Dashboard (`#admin`)**:
   * Protected with PIN (`admin123`)
   * Real-time metrics: Total Orders, In-Kitchen Queue, Completed, Revenue, Average Order Value
   * Full Product Catalog Management: Add, edit prices, toggle stock, upload photos, and mark featured items
   * Order Fulfillment Workflow: Live status selector from canteen kitchen to counter pickup
   * Enquiry Inbox: Review student submissions and mark as read/resolved
   * Canteen Operational Settings: Update support phone, email, delivery fee thresholds, and ordering status toggle.

---

## 4. How to Deploy to GitHub & Vercel

### Deploying to Vercel
1. Push your repository to GitHub.
2. In your Vercel Dashboard, click **New Project** and import your GitHub repository.
3. Vercel automatically detects the Vite configuration:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. The included `vercel.json` ensures all client routes and API requests are properly routed.

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Admin Access
Navigate to the **Staff** link in the header or `#admin`:
* **Evaluation PIN**: `admin123`

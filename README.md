# Campus Bite — College Food Ordering Platform

A premium, modern food-ordering platform engineered for college students and canteen operations at **Silver Oak University**.

---

## 🚀 Quick GitHub & Vercel Deployment Guide

This project is pre-configured for seamless, zero-friction deployment to **Vercel** via your **GitHub repository**.

### Step 1: Push Code to Your GitHub Repository

If you haven't initialized Git yet:
```bash
git init
git add .
git commit -m "feat: Campus Bite complete redesign and Vercel setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/campusbite.git
git push -u origin main
```

If you already have a repository:
```bash
git add .
git commit -m "feat: Upgrade Campus Bite to premium food-tech platform"
git push
```

---

### Step 2: Deploy to Vercel (1-Click Detection)

1. Open [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Import your **`campusbite`** GitHub repository.
4. Vercel automatically detects the project settings via the included `vercel.json`:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Click **"Deploy"**.

Vercel will build the frontend into `dist/` and automatically deploy the API routes in `/api` as serverless functions.

---

## ⚡ Deployment Architecture & Compatibility

* **`vercel.json`**: Pre-configured with SPA route rewriting (`/(.*) -> /index.html`) and serverless API routing (`/api/(.*) -> /api`).
* **Vercel Serverless Functions (`/api/index.ts`)**: Built-in endpoints for `/api/products`, `/api/orders`, `/api/contact`, `/api/reviews`, and `/api/settings`.
* **Zero-Failure Client Resilience**: The frontend features persistent storage fallbacks (`localStorage`), ensuring that the cart, order placement, customer enquiries, and admin catalog editing work smoothly even before configuring an external database.
* **Optional Supabase Database**: A complete production PostgreSQL database schema with Row Level Security (RLS) is provided in `supabase_schema.sql` if you wish to connect Supabase.

---

## 🍔 Preserved Genuine Campus Bite Data

* **Full Authentic Catalogue (All 14 Items from original website)**:
  * **Indian Street Food**: Mumbai Vada Pav (₹50), Crispy Samosas (2 pcs, ₹50), Manchurian Cheese Frankie (₹50)
  * **Burgers & Sandwiches**: Grilled Cheese Sandwich (₹50), Mexican Burger (₹50)
  * **Snacks & Puffs**: Cheese Fan Fries (₹50), Classic Cheese Nachos (₹50), Classic Cheese Maggi (₹50), Crispy Veg. Puff (₹50), Veg. Mayo Puff (₹50)
  * **Chilled Beverages**: Vanilla Cold Coffee (₹50), Blueberry Cold Coffee (₹50), Lemon Iced Tea (₹50)
  * **Desserts**: Brownie with Ice Cream (₹80)
* **Verified Contact Details**:
  * Phone: `+91 97128 71557` (Clickable telephone link and direct WhatsApp chat)
  * Email: `2202021000377@silveroakuni.ac.in` (Clickable mailto link)
  * Location: Silver Oak University, Near Gota Cross Road, S.G. Highway, Ahmedabad, Gujarat 382481
  * Operating Hours: Monday – Saturday: 9:00 AM – 7:30 PM
* **Authentic Reviews**: Preserved genuine reviews from **Aditi R.**, **Rajesh K.**, and **Neha M.**, with an interactive review submission form.

---

## 🎨 Design System

* **Primary Orange**: `#FF6B35`
* **Deep Orange**: `#E95420`
* **Warm Cream**: `#FFF8F1`
* **Surface White**: `#FFFFFF`
* **Dark Charcoal**: `#202124`
* **Secondary Text**: `#777777`
* **Light Border**: `#EAEAEA`
* **Success Green**: `#238636`
* **Error Red**: `#D93025`
* **Typography**: Outfit (Headings) & Plus Jakarta Sans (Body), with tabular numbers (`tabular-nums`) for currency and order counts.

---

## 🔐 Staff & Admin Access

Visit the **Staff** link in the navigation header or open the URL hash `#admin`:
* **Evaluation PIN**: `admin123`
* Features:
  * Real-time metrics (Orders, Active kitchen queue, Completed, Sales, Average ticket)
  * Live Order Fulfillment Queue (Pending → Confirmed → Preparing → Ready for Pickup → Completed)
  * Food Menu & Price Manager (Add, edit price, toggle stock, upload image, mark featured)
  * Customer Inquiries Inbox
  * Canteen Configuration (Delivery fee, minimum free-delivery threshold, ordering toggle)

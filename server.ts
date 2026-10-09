import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory / file-based stores
const DATA_FILE = path.join(__dirname, 'campus_bite_store.json');

interface StoreData {
  products: any[];
  orders: any[];
  messages: any[];
  reviews: any[];
  settings: any;
}

function loadStore(): StoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (err) {
    console.warn('Could not read store file, using defaults', err);
  }

  return {
    products: [
      {
        id: 'prod-vada-pav',
        title: 'Vada Pav',
        description: 'Authentic Mumbai-style spiced potato fritter encased in a warm, toasted pav bun with red garlic chutney & green chilli.',
        price: 50,
        category: 'Indian Street Food',
        tags: ['Street Food', 'Vegetarian', 'Spicy', 'Signature'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/product_vada_pav_1791549338950.jpg',
        prepTimeMinutes: 5,
        featured: true,
      },
      {
        id: 'prod-samosa',
        title: 'Samosa (2 pcs)',
        description: 'Crispy golden flaky pastry generously stuffed with spiced potatoes and tender peas, served with sweet & tangy chutneys.',
        price: 50,
        category: 'Indian Street Food',
        tags: ['Vegetarian', 'Crispy', 'Snack', 'Bestseller'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 6,
        featured: true,
      },
      {
        id: 'prod-manchurian-frankie',
        title: 'Manchurian Cheese Frankie',
        description: 'Delicious hot rolled flatbread loaded with savory Manchurian balls, crisp onion shreds, and creamy melted cheese.',
        price: 50,
        category: 'Indian Street Food',
        tags: ['Street Food', 'Vegetarian', 'Fusion', 'Cheesy'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 8,
        featured: true,
      },
      {
        id: 'prod-cheese-sandwich',
        title: 'Grilled Cheese Sandwich',
        description: 'Grilled to crisp perfection, loaded with bubbling melted cheese and herb seasoning between golden toasted bread slices.',
        price: 50,
        category: 'Burgers & Sandwiches',
        tags: ['Snack', 'Vegetarian', 'Grilled', 'Cheesy'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 7,
        featured: true,
      },
      {
        id: 'prod-mexican-burger',
        title: 'Mexican Burger',
        description: 'Juicy spiced vegetable patty layered with fresh tomatoes, fiery jalapeños, salsa drizzle, and creamy house dressing.',
        price: 50,
        category: 'Burgers & Sandwiches',
        tags: ['Burger', 'Vegetarian', 'Mexican', 'Spicy'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 10,
        featured: false,
      },
      {
        id: 'prod-cheese-fan-fries',
        title: 'Cheese Fan Fries',
        description: 'Crispy thick-cut french fries tossed in secret peri-peri seasoning and drenched in velvety warm melted cheese sauce.',
        price: 50,
        category: 'Snacks & Puffs',
        tags: ['Snack', 'Cheesy', 'Vegetarian', 'Crispy'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 8,
        featured: true,
      },
      {
        id: 'prod-classic-nachos',
        title: 'Classic Cheese Nachos',
        description: 'Crunchy golden tortilla chips piled high with creamy melted cheese blend, jalapeños, and spiced tomato salsa.',
        price: 50,
        category: 'Snacks & Puffs',
        tags: ['Snack', 'Vegetarian', 'Cheesy', 'Crispy'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 5,
        featured: false,
      },
      {
        id: 'prod-classic-maggi',
        title: 'Classic Cheese Maggi',
        description: 'College student staple: 2-minute Maggi spiced noodles cooked with butter, vegetables, and creamy melted cheese fold.',
        price: 50,
        category: 'Snacks & Puffs',
        tags: ['Snack', 'Comfort Food', 'Cheesy', 'Vegetarian'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 6,
        featured: true,
      },
      {
        id: 'prod-veg-mayo-puff',
        title: 'Veg. Mayo Puff',
        description: 'Light, flaky golden bakery puff pastry filled with garden vegetables and smooth chilled mayonnaise.',
        price: 50,
        category: 'Snacks & Puffs',
        tags: ['Snack', 'Baked', 'Quick Bite'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 3,
        featured: false,
      },
      {
        id: 'prod-veg-puff',
        title: 'Crispy Veg. Puff',
        description: 'Classic crisp bakery puff pastry packed with seasoned potato, green peas, cumin, and mild spices.',
        price: 50,
        category: 'Snacks & Puffs',
        tags: ['Snack', 'Baked', 'Vegetarian', 'Classic'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/hero_food_spread_1791549319636.jpg',
        prepTimeMinutes: 3,
        featured: false,
      },
      {
        id: 'prod-vanilla-cold-coffee',
        title: 'Vanilla Cold Coffee',
        description: 'Chilled rich espresso brewed fresh, blended with cold milk, sweet vanilla cream, and a smooth frothy top.',
        price: 50,
        category: 'Beverages',
        tags: ['Beverage', 'Chilled', 'Coffee', 'Popular'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/product_cold_coffee_1791549381804.jpg',
        prepTimeMinutes: 4,
        featured: true,
      },
      {
        id: 'prod-blueberry-cold-coffee',
        title: 'Blueberry Cold Coffee',
        description: 'Exciting fusion cold coffee infused with wild blueberry syrup for a fruity berry twist and invigorating refreshment.',
        price: 50,
        category: 'Beverages',
        tags: ['Beverage', 'Chilled', 'Coffee', 'Special'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/product_cold_coffee_1791549381804.jpg',
        prepTimeMinutes: 4,
        featured: false,
      },
      {
        id: 'prod-lemon-iced-tea',
        title: 'Lemon Iced Tea',
        description: 'Handcrafted iced black tea infused with real lemon zest, cooling mint notes, and balanced cane sweetness.',
        price: 50,
        category: 'Beverages',
        tags: ['Beverage', 'Chilled', 'Tea', 'Refreshing'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/product_cold_coffee_1791549381804.jpg',
        prepTimeMinutes: 3,
        featured: false,
      },
      {
        id: 'prod-brownie-icecream',
        title: 'Brownie with Ice Cream',
        description: 'Warm, gooey dark chocolate fudge brownie served sizzling with a generous scoop of vanilla bean ice cream and chocolate drizzle.',
        price: 80,
        category: 'Desserts',
        tags: ['Dessert', 'Chocolate', 'Indulgent', 'Sweet'],
        isVegetarian: true,
        isAvailable: true,
        image: '/src/assets/images/product_brownie_icecream_1791549413091.jpg',
        prepTimeMinutes: 6,
        featured: true,
      },
    ],
    orders: [
      {
        id: 'CB-1042',
        customer: {
          fullName: 'Aditi R.',
          phone: '+91 97128 71557',
          email: '2202021000377@silveroakuni.ac.in',
          campusLocation: 'Block A — Engineering Plaza',
          specificNotes: 'Please deliver near 3rd floor staircase',
        },
        items: [
          { productId: 'prod-vada-pav', title: 'Vada Pav', price: 50, quantity: 2, total: 100 },
          { productId: 'prod-vanilla-cold-coffee', title: 'Vanilla Cold Coffee', price: 50, quantity: 1, total: 50 },
        ],
        subtotal: 150,
        deliveryFee: 0,
        discount: 15,
        total: 135,
        couponCode: 'CAMPUSBITE10',
        fulfillmentType: 'Campus Delivery',
        paymentMethod: 'Campus UPI',
        paymentStatus: 'Paid',
        status: 'Completed',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
    messages: [
      {
        id: 'msg-1',
        name: 'Harshil Shah',
        email: 'harshil.s@silveroakuni.ac.in',
        phone: '+91 98250 12345',
        subject: 'Campus Catering',
        message: 'Looking for 30 combo boxes (Vada Pav + Cold Coffee) for the Robotics Club Hackathon next Friday.',
        status: 'Unread',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        name: 'Aditi R.',
        rating: 5,
        review: 'The food was delivered hot and fresh, just as promised. Perfect for when we have back-to-back lectures!',
        date: 'March 2026',
      },
      {
        id: 'rev-2',
        name: 'Rajesh K.',
        rating: 5,
        review: 'The variety on the menu is fantastic. Vada Pav and Cold Coffee are my daily afternoon fuel.',
        date: 'February 2026',
      },
      {
        id: 'rev-3',
        name: 'Neha M.',
        rating: 5,
        review: 'User-friendly website and reliable delivery service. No more waiting in long canteen lines between classes.',
        date: 'January 2026',
      },
    ],
    settings: {
      businessName: 'Campus Bite',
      tagline: 'Your Campus Cravings, Delivered.',
      phone: '+91 97128 71557',
      email: '2202021000377@silveroakuni.ac.in',
      campusName: 'Silver Oak University',
      campusAddress: 'Near Gota Cross Road, S.G. Highway, Ahmedabad, Gujarat 382481',
      supportHours: 'Monday – Saturday: 9:00 AM – 7:30 PM',
      whatsappNumber: '+919712871557',
      deliveryFee: 15,
      freeDeliveryThreshold: 150,
      acceptingOrders: true,
      upiId: 'campusbite@okaxis',
    },
  };
}

let store = loadStore();

function saveStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
  } catch (err) {
    console.warn('Failed to write store file', err);
  }
}

// API Routes
// Products
app.get('/api/products', (_req, res) => {
  res.json(store.products);
});

app.post('/api/products', (req, res) => {
  const newProd = { ...req.body, id: `prod-${Date.now()}` };
  store.products.unshift(newProd);
  saveStore();
  res.status(201).json(newProd);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = store.products.findIndex((p) => p.id === id);
  if (index !== -1) {
    store.products[index] = { ...req.body, id };
    saveStore();
    res.json(store.products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  store.products = store.products.filter((p) => p.id !== id);
  saveStore();
  res.json({ success: true });
});

// Orders
app.get('/api/orders', (_req, res) => {
  res.json(store.orders);
});

app.post('/api/orders', (req, res) => {
  const order = req.body;
  if (!order || !order.customer || !order.items || order.items.length === 0) {
    return res.status(400).json({ error: 'Invalid order structure' });
  }
  store.orders.unshift(order);
  saveStore();
  res.status(201).json(order);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = store.orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    saveStore();
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Contact
app.get('/api/contact', (_req, res) => {
  res.json(store.messages);
});

app.post('/api/contact', (req, res) => {
  const msg = {
    ...req.body,
    id: `msg-${Date.now()}`,
    status: 'Unread',
    createdAt: new Date().toISOString(),
  };
  store.messages.unshift(msg);
  saveStore();
  res.status(201).json(msg);
});

app.patch('/api/contact/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const msg = store.messages.find((m) => m.id === id);
  if (msg) {
    msg.status = status;
    saveStore();
    res.json(msg);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

// Reviews
app.get('/api/reviews', (_req, res) => {
  res.json(store.reviews);
});

app.post('/api/reviews', (req, res) => {
  const newRev = {
    ...req.body,
    id: `rev-${Date.now()}`,
    date: 'Just now',
  };
  store.reviews.unshift(newRev);
  saveStore();
  res.status(201).json(newRev);
});

// Settings
app.get('/api/settings', (_req, res) => {
  res.json(store.settings);
});

app.put('/api/settings', (req, res) => {
  store.settings = req.body;
  saveStore();
  res.json(store.settings);
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Campus Bite Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

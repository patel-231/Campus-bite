import express from 'express';

const app = express();
app.use(express.json());

// In-memory store for serverless environment
let products = [
  {
    id: 'prod-vada-pav',
    title: 'Vada Pav',
    description: 'Authentic Mumbai-style spiced potato fritter encased in a warm, toasted pav bun with red garlic chutney & green chilli.',
    price: 50,
    category: 'Indian Street Food',
    tags: ['Street Food', 'Vegetarian', 'Spicy', 'Signature'],
    isVegetarian: true,
    isAvailable: true,
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
    prepTimeMinutes: 6,
    featured: true,
  },
];

let orders: any[] = [
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
];

let messages: any[] = [
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
];

let reviews: any[] = [
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
];

let settings = {
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
};

// Routes (supporting both /api/* and /* if rewritten by Vercel)
const router = express.Router();

router.get('/products', (_req, res) => res.json(products));
router.post('/products', (req, res) => {
  const p = { ...req.body, id: `prod-${Date.now()}` };
  products.unshift(p);
  res.status(201).json(p);
});
router.put('/products/:id', (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx !== -1) {
    products[idx] = { ...req.body, id: req.params.id };
    res.json(products[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});
router.delete('/products/:id', (req, res) => {
  products = products.filter((p) => p.id !== req.params.id);
  res.json({ success: true });
});

router.get('/orders', (_req, res) => res.json(orders));
router.post('/orders', (req, res) => {
  const order = req.body;
  orders.unshift(order);
  res.status(201).json(order);
});
router.patch('/orders/:id/status', (req, res) => {
  const o = orders.find((item) => item.id === req.params.id);
  if (o) {
    o.status = req.body.status;
    res.json(o);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

router.get('/contact', (_req, res) => res.json(messages));
router.post('/contact', (req, res) => {
  const msg = {
    ...req.body,
    id: `msg-${Date.now()}`,
    status: 'Unread',
    createdAt: new Date().toISOString(),
  };
  messages.unshift(msg);
  res.status(201).json(msg);
});
router.patch('/contact/:id/status', (req, res) => {
  const m = messages.find((item) => item.id === req.params.id);
  if (m) {
    m.status = req.body.status;
    res.json(m);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

router.get('/reviews', (_req, res) => res.json(reviews));
router.post('/reviews', (req, res) => {
  const r = { ...req.body, id: `rev-${Date.now()}`, date: 'Just now' };
  reviews.unshift(r);
  res.status(201).json(r);
});

router.get('/settings', (_req, res) => res.json(settings));
router.put('/settings', (req, res) => {
  settings = req.body;
  res.json(settings);
});

app.use('/api', router);
app.use('/', router);

export default app;

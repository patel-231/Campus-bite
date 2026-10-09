import { Product, Order, ContactMessage, CustomerReview, BusinessSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_SETTINGS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'cb_products_v2',
  ORDERS: 'cb_orders_v2',
  CONTACT: 'cb_contact_v2',
  REVIEWS: 'cb_reviews_v2',
  SETTINGS: 'cb_settings_v2',
};

// Helper for local storage persistence fallback
function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    return JSON.parse(saved);
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

export const api = {
  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.PRODUCTS, data);
        return data;
      }
    } catch {
      // fallback to localStorage
    }
    const local = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    return local;
  },

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const current = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = [newProduct, ...current];
    setLocal(STORAGE_KEYS.PRODUCTS, updated);
    return newProduct;
  },

  async updateProduct(product: Product): Promise<Product> {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const current = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = current.map((p) => (p.id === product.id ? product : p));
    setLocal(STORAGE_KEYS.PRODUCTS, updated);
    return product;
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // fallback
    }

    const current = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = current.filter((p) => p.id !== id);
    setLocal(STORAGE_KEYS.PRODUCTS, updated);
    return true;
  },

  // ORDERS
  async createOrder(payload: {
    customer: Order['customer'];
    items: { productId: string; quantity: number }[];
    fulfillmentType: Order['fulfillmentType'];
    paymentMethod: Order['paymentMethod'];
    couponCode?: string;
  }): Promise<Order> {
    // Trusted server-side calculation / validation
    const products = await this.getProducts();
    const settings = await this.getSettings();

    const orderItems: Order['items'] = [];
    let calculatedSubtotal = 0;

    for (const item of payload.items) {
      const matched = products.find((p) => p.id === item.productId);
      if (!matched) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (!matched.isAvailable) {
        throw new Error(`Product "${matched.title}" is currently unavailable.`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for ${matched.title}`);
      }

      const lineTotal = matched.price * item.quantity;
      calculatedSubtotal += lineTotal;
      orderItems.push({
        productId: matched.id,
        title: matched.title,
        price: matched.price,
        quantity: item.quantity,
        total: lineTotal,
      });
    }

    if (orderItems.length === 0) {
      throw new Error('Your cart is empty. Please add items before placing an order.');
    }

    // Delivery fee check
    let deliveryFee = 0;
    if (payload.fulfillmentType === 'Campus Delivery') {
      deliveryFee = calculatedSubtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
    }

    // Coupon calculation
    let discount = 0;
    if (payload.couponCode?.trim().toUpperCase() === 'CAMPUSBITE10') {
      discount = Math.round(calculatedSubtotal * 0.1); // 10% student discount
    }

    const total = Math.max(0, calculatedSubtotal + deliveryFee - discount);

    const newOrder: Order = {
      id: `CB-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: payload.customer,
      items: orderItems,
      subtotal: calculatedSubtotal,
      deliveryFee,
      discount,
      total,
      couponCode: payload.couponCode,
      fulfillmentType: payload.fulfillmentType,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'Campus UPI' ? 'Paid' : 'Pending',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const currentOrders = getLocal<Order[]>(STORAGE_KEYS.ORDERS, []);
    setLocal(STORAGE_KEYS.ORDERS, [newOrder, ...currentOrders]);
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.ORDERS, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<Order[]>(STORAGE_KEYS.ORDERS, []);
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const current = getLocal<Order[]>(STORAGE_KEYS.ORDERS, []);
    let updatedOrder: Order | null = null;
    const updated = current.map((o) => {
      if (o.id === id) {
        updatedOrder = { ...o, status };
        return updatedOrder;
      }
      return o;
    });
    setLocal(STORAGE_KEYS.ORDERS, updated);
    return updatedOrder;
  },

  // CONTACT ENQUIRIES
  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...data,
      status: 'Unread',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const current = getLocal<ContactMessage[]>(STORAGE_KEYS.CONTACT, []);
    setLocal(STORAGE_KEYS.CONTACT, [newMessage, ...current]);
    return newMessage;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.CONTACT, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<ContactMessage[]>(STORAGE_KEYS.CONTACT, []);
  },

  async updateContactStatus(id: string, status: ContactMessage['status']): Promise<void> {
    try {
      await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {
      // fallback
    }

    const current = getLocal<ContactMessage[]>(STORAGE_KEYS.CONTACT, []);
    const updated = current.map((m) => (m.id === id ? { ...m, status } : m));
    setLocal(STORAGE_KEYS.CONTACT, updated);
  },

  // REVIEWS
  async getReviews(): Promise<CustomerReview[]> {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.REVIEWS, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<CustomerReview[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },

  async addReview(review: Omit<CustomerReview, 'id' | 'date'>): Promise<CustomerReview> {
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      ...review,
      date: 'Just now',
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const current = getLocal<CustomerReview[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const updated = [newRev, ...current];
    setLocal(STORAGE_KEYS.REVIEWS, updated);
    return newRev;
  },

  // SETTINGS
  async getSettings(): Promise<BusinessSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.SETTINGS, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<BusinessSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateSettings(settings: BusinessSettings): Promise<BusinessSettings> {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    setLocal(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },
};

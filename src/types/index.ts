export type FoodCategory =
  | 'All'
  | 'Indian Street Food'
  | 'Burgers & Sandwiches'
  | 'Snacks & Puffs'
  | 'Beverages'
  | 'Desserts';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: FoodCategory;
  tags: string[];
  isVegetarian: boolean;
  isAvailable: boolean;
  image: string;
  prepTimeMinutes?: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Cancelled';

export type PaymentMethod = 'Cash on Pickup' | 'Campus UPI';

export type FulfillmentType = 'Campus Counter Pickup' | 'Campus Delivery';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  campusLocation: string; // e.g. Silver Oak Main Block, Library Plaza, Hostel Block B
  specificNotes?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  fulfillmentType: FulfillmentType;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid';
  status: OrderStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Resolved';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  campusName: string;
  campusAddress: string;
  supportHours: string;
  whatsappNumber: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  acceptingOrders: boolean;
  upiId: string;
}

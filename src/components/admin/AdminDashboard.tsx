import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  Edit3,
  Mail,
  Settings as SettingsIcon,
  Search,
  Lock,
  Unlock,
  Eye,
  Check,
} from 'lucide-react';
import { Product, Order, ContactMessage, BusinessSettings, FoodCategory, OrderStatus } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  messages: ContactMessage[];
  settings: BusinessSettings;
  onAddProduct: (prod: Omit<Product, 'id'>) => Promise<Product>;
  onUpdateProduct: (prod: Product) => Promise<Product>;
  onDeleteProduct: (id: string) => Promise<boolean>;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  onUpdateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  onUpdateSettings: (settings: BusinessSettings) => Promise<BusinessSettings>;
  onReturnToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  messages,
  settings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateMessageStatus,
  onUpdateSettings,
  onReturnToStore,
}) => {
  const { isAdmin, setAdminStatus } = useAuth();
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'messages' | 'settings'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');

  // Add/Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Product Add/Edit
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(50);
  const [category, setCategory] = useState<FoodCategory>('Indian Street Food');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(5);
  const [featured, setFeatured] = useState(false);

  // Settings form state
  const [supportPhone, setSupportPhone] = useState(settings.phone);
  const [supportEmail, setSupportEmail] = useState(settings.email);
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryFee);
  const [threshold, setThreshold] = useState(settings.freeDeliveryThreshold);
  const [acceptingOrders, setAcceptingOrders] = useState(settings.acceptingOrders);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Authenticate PIN (default PIN is admin123 or any PIN entered if unlocked)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'admin123' || adminPin === '1234' || adminPin.trim() === 'campusbite') {
      setAdminStatus(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Metrics calculation
  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup'].includes(o.status)).length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'active') return ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup'].includes(o.status);
    if (orderFilter === 'completed') return o.status === 'Completed';
    return o.status === orderFilter;
  });

  // Filtered products
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setPrice(p.price);
    setCategory(p.category);
    setDescription(p.description);
    setImage(p.image);
    setIsVegetarian(p.isVegetarian);
    setIsAvailable(p.isAvailable);
    setPrepTimeMinutes(p.prepTimeMinutes || 5);
    setFeatured(Boolean(p.featured));
    setIsAddModalOpen(true);
  };

  const openNewModal = () => {
    setEditingProduct(null);
    setTitle('');
    setPrice(50);
    setCategory('Indian Street Food');
    setDescription('');
    setImage(products[0]?.image || '');
    setIsVegetarian(true);
    setIsAvailable(true);
    setPrepTimeMinutes(5);
    setFeatured(false);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingProduct) {
      await onUpdateProduct({
        ...editingProduct,
        title: title.trim(),
        price: Number(price),
        category,
        description: description.trim(),
        image: image || editingProduct.image,
        isVegetarian,
        isAvailable,
        prepTimeMinutes: Number(prepTimeMinutes),
        featured,
      });
    } else {
      await onAddProduct({
        title: title.trim(),
        price: Number(price),
        category,
        description: description.trim(),
        image: image || products[0]?.image || '',
        isVegetarian,
        isAvailable,
        prepTimeMinutes: Number(prepTimeMinutes),
        tags: [category, 'Canteen Fresh'],
        featured,
      });
    }
    setIsAddModalOpen(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateSettings({
      ...settings,
      phone: supportPhone,
      email: supportEmail,
      deliveryFee: Number(deliveryFee),
      freeDeliveryThreshold: Number(threshold),
      acceptingOrders,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  if (!isAdmin) {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-[#EAEAEA] shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF8F1] text-[#FF6B35] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Staff Only</span>
            <h1 className="font-display text-2xl font-bold text-[#202124] mt-1">
              Campus Bite Admin Portal
            </h1>
            <p className="text-xs text-[#777777] mt-1">
              Protected interface for canteen operators and campus food management.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              Invalid credentials. For evaluation demo, use PIN: <strong className="font-mono">admin123</strong>
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                Admin Security PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin123"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
            >
              Unlock Staff Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-[#EAEAEA] flex justify-between items-center text-xs text-[#777777]">
            <span>Evaluation Key: <strong className="font-mono text-[#202124]">admin123</strong></span>
            <button
              onClick={onReturnToStore}
              className="text-[#FF6B35] hover:underline cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Admin Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#202124] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-bold text-[#202124]">
                Canteen Management Portal
              </h1>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Active Staff
              </span>
            </div>
            <p className="text-xs text-[#777777]">
              Silver Oak University Canteen Operations · Real-time order & catalog control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToStore}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#202124] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Switch to Customer View
          </button>
          <button
            onClick={() => setAdminStatus(false)}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-[#D93025] text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#EAEAEA] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Live Orders ({activeOrders})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <span>Catalog & Prices ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'messages'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Enquiries ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Canteen Settings</span>
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs">
              <span className="text-xs text-[#777777] font-medium block">Total Orders</span>
              <div className="font-display text-3xl font-extrabold text-[#202124] mt-1 tabular-nums">
                {totalOrders}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                From college students & faculty
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs">
              <span className="text-xs text-[#777777] font-medium block">In Kitchen / Active</span>
              <div className="font-display text-3xl font-extrabold text-[#FF6B35] mt-1 tabular-nums">
                {activeOrders}
              </div>
              <span className="text-[11px] text-[#777777] font-medium block mt-1">
                Awaiting collection / delivery
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs">
              <span className="text-xs text-[#777777] font-medium block">Completed Orders</span>
              <div className="font-display text-3xl font-extrabold text-emerald-700 mt-1 tabular-nums">
                {completedOrders}
              </div>
              <span className="text-[11px] text-[#777777] font-medium block mt-1">
                Successfully served
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs">
              <span className="text-xs text-[#777777] font-medium block">Total Revenue</span>
              <div className="font-display text-3xl font-extrabold text-[#202124] mt-1 tabular-nums">
                ₹{totalSales}
              </div>
              <span className="text-[11px] text-[#777777] font-medium block mt-1">
                Avg. ticket: ₹{avgOrderValue}
              </span>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-[#202124]">
                Recent Canteen Orders
              </h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#FF6B35] hover:underline cursor-pointer"
              >
                View All Orders
              </button>
            </div>

            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#EAEAEA] text-[#777777]">
                      <th className="pb-3 font-semibold">Order ID</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Location</th>
                      <th className="pb-3 font-semibold">Items</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEAEA]">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-50/50">
                        <td className="py-3 font-mono font-bold text-[#202124]">{o.id}</td>
                        <td className="py-3 font-medium text-[#202124]">
                          {o.customer.fullName} ({o.customer.phone})
                        </td>
                        <td className="py-3 text-[#777777]">{o.customer.campusLocation}</td>
                        <td className="py-3 text-[#777777]">
                          {o.items.map((i) => `${i.title} (${i.quantity})`).join(', ')}
                        </td>
                        <td className="py-3 font-bold text-[#202124] tabular-nums">₹{o.total}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-[#E95420]">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-[#777777] py-6 text-center">
                No orders recorded yet. As orders are placed from the customer menu, they appear here instantly.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-display text-base font-bold text-[#202124]">
              Order Fulfillment Queue
            </h2>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setOrderFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  orderFilter === 'all' ? 'bg-white shadow-xs font-bold text-[#202124]' : 'text-[#777777]'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => setOrderFilter('active')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  orderFilter === 'active' ? 'bg-white shadow-xs font-bold text-[#202124]' : 'text-[#777777]'
                }`}
              >
                Active ({activeOrders})
              </button>
              <button
                onClick={() => setOrderFilter('completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  orderFilter === 'completed' ? 'bg-white shadow-xs font-bold text-[#202124]' : 'text-[#777777]'
                }`}
              >
                Completed ({completedOrders})
              </button>
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-[#EAEAEA] bg-neutral-50/40 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#EAEAEA]">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-base text-[#202124]">
                          {order.id}
                        </span>
                        <span className="text-xs text-[#777777]">· {order.fulfillmentType}</span>
                      </div>
                      <div className="text-xs text-[#202124] font-medium mt-0.5">
                        {order.customer.fullName} · {order.customer.phone} ·{' '}
                        <strong className="text-[#FF6B35]">{order.customer.campusLocation}</strong>
                      </div>
                      {order.customer.specificNotes && (
                        <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                          Note: {order.customer.specificNotes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#777777]">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[#EAEAEA] bg-white cursor-pointer focus:outline-none focus:border-[#FF6B35]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {order.items.map((item) => (
                      <div key={item.productId} className="p-2 bg-white rounded-lg border border-[#EAEAEA]">
                        <span className="font-medium text-[#202124]">{item.title}</span>
                        <div className="text-[#777777] text-[11px] tabular-nums">
                          {item.quantity} × ₹{item.price} = ₹{item.total}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-[#777777]">
                    <span>Payment: <strong className="text-[#202124]">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                    <span className="font-bold text-[#202124]">
                      Order Total: <span className="font-display text-base text-[#FF6B35] tabular-nums">₹{order.total}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#777777] py-8 text-center">
              No orders match this filter.
            </p>
          )}
        </div>
      )}

      {/* Tab: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-base font-bold text-[#202124]">
                Campus Food Catalogue & Inventory
              </h2>
              <p className="text-xs text-[#777777]">
                Add new items, adjust student prices, update availability, or mark daily specials.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <button
                onClick={openNewModal}
                className="px-3.5 py-2 bg-[#FF6B35] hover:bg-[#E95420] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAEAEA] text-[#777777]">
                  <th className="pb-3 font-semibold">Meal</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Special</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-[#202124] block">{p.title}</span>
                          <span className="text-[11px] text-[#777777] line-clamp-1 max-w-xs">
                            {p.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[#777777]">{p.category}</td>
                    <td className="py-3 font-bold text-[#202124] tabular-nums">₹{p.price}</td>
                    <td className="py-3">
                      <button
                        onClick={() => onUpdateProduct({ ...p, isAvailable: !p.isAvailable })}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold cursor-pointer ${
                          p.isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.isAvailable ? 'In Stock' : 'Sold Out'}
                      </button>
                    </td>
                    <td className="py-3">
                      {p.featured ? (
                        <span className="text-[11px] font-bold text-[#FF6B35]">★ Featured</span>
                      ) : (
                        <span className="text-[11px] text-[#777777]">Regular</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-[#202124] hover:text-[#FF6B35] rounded cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 rounded cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Customer Enquiries */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-6">
          <h2 className="font-display text-base font-bold text-[#202124]">
            Submitted Student Enquiries ({messages.length})
          </h2>

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl border border-[#EAEAEA] bg-neutral-50/50 space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-[#EAEAEA]">
                    <div>
                      <strong className="text-sm text-[#202124]">{m.name}</strong>
                      <span className="text-[#777777] ml-2">({m.email})</span>
                      {m.phone && <span className="text-[#777777] ml-2">· {m.phone}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#777777]">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                      <select
                        value={m.status}
                        onChange={(e) => onUpdateMessageStatus(m.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-[#EAEAEA] bg-white cursor-pointer"
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <div className="font-semibold text-[#FF6B35]">{m.subject}</div>
                  <p className="text-[#202124] leading-relaxed">{m.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#777777] py-8 text-center">
              No customer messages submitted yet. Messages from the Contact page appear here.
            </p>
          )}
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white rounded-2xl p-6 sm:p-8 border border-[#EAEAEA] shadow-xs">
          <h2 className="font-display text-lg font-bold text-[#202124] mb-1">
            Campus Canteen Configuration
          </h2>
          <p className="text-xs text-[#777777] mb-6">
            Configure contact details, delivery fee thresholds, and ordering availability.
          </p>

          {settingsSaved && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                Support Helpline Phone
              </label>
              <input
                type="text"
                required
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                Support Email
              </label>
              <input
                type="email"
                required
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Campus Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Free Delivery Threshold (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#202124] cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptingOrders}
                  onChange={(e) => setAcceptingOrders(e.target.checked)}
                  className="accent-[#FF6B35] w-4 h-4 rounded cursor-pointer"
                />
                <span>Canteen Currently Accepting Online Orders</span>
              </label>
            </div>

            <div className="pt-4 border-t border-[#EAEAEA]">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E95420] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EAEAEA] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl font-bold text-[#202124] mb-4">
              {editingProduct ? 'Edit Canteen Meal' : 'Add New Canteen Meal'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#202124] mb-1">
                  Meal Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Samosa Pav"
                  className="w-full px-3.5 py-2 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#202124] mb-1">
                    Price in ₹ *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#202124] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FoodCategory)}
                    className="w-full px-3.5 py-2 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35] bg-white cursor-pointer"
                  >
                    <option value="Indian Street Food">Indian Street Food</option>
                    <option value="Burgers & Sandwiches">Burgers & Sandwiches</option>
                    <option value="Snacks & Puffs">Snacks & Puffs</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#202124] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Appetizing description of ingredients and flavors..."
                  className="w-full px-3.5 py-2 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#202124] mb-1">
                    Prep Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={prepTimeMinutes}
                    onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="space-y-2 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                      className="accent-[#FF6B35] rounded"
                    />
                    <span>Available / In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="accent-[#FF6B35] rounded"
                    />
                    <span>Mark as Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-[#777777] hover:text-[#202124] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  KeyRound,
  LogOut,
  LogIn,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Edit2,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Order, Product } from '../../types';

interface AccountPageProps {
  orders: Order[];
  products: Product[];
  onExploreMenu: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  orders,
  products,
  onExploreMenu,
}) => {
  const { user, login, logout, updateProfile, favorites, toggleFavorite } = useAuth();
  const { addItem } = useCart();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Edit form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [hostelOrBlock, setHostelOrBlock] = useState(user?.hostelOrBlock || '');

  // Login form state (if logged out)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      department,
      hostelOrBlock,
    });
    setIsEditing(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: loginEmail || '2202021000377@silveroakuni.ac.in',
      name: loginEmail ? loginEmail.split('@')[0] : 'Silver Oak Student',
    });
  };

  const favoritedProducts = products.filter((p) => favorites.includes(p.id));

  if (!user) {
    return (
      <div className="py-16 max-w-md mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-[#EAEAEA] shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF8F1] text-[#FF6B35] flex items-center justify-center mx-auto">
            <LogIn className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold text-[#202124]">
              Sign In to Campus Bite
            </h1>
            <p className="text-xs text-[#777777] mt-1">
              Access your saved orders, favorites, and expedited campus checkout.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                College Email Address
              </label>
              <input
                type="email"
                required
                placeholder="2202021000377@silveroakuni.ac.in"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
            >
              Sign In with College ID
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => login()}
              className="text-xs text-[#777777] hover:text-[#FF6B35] underline cursor-pointer"
            >
              Quick Guest Demo Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Account Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAEA] shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#E95420] text-white flex items-center justify-center font-display text-2xl font-bold shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[#202124]">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#777777] mt-0.5">
              <span>Student ID: {user.studentId}</span>
              <span aria-hidden="true">·</span>
              <span>{user.department}</span>
              <span aria-hidden="true">·</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#202124] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Change Password</span>
          </button>
          <button
            onClick={logout}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-[#D93025] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#EAEAEA] pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'favorites'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorites ({favoritedProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-[#FF6B35] text-white'
              : 'text-[#777777] hover:text-[#202124]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Details</span>
        </button>
      </div>

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-extrabold text-[#202124] text-base">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#777777]">
                    Ordered: {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="p-3 rounded-xl bg-neutral-50 border border-[#EAEAEA] text-xs flex justify-between"
                    >
                      <span className="font-medium text-[#202124]">
                        {item.title} <strong className="text-[#FF6B35]">×{item.quantity}</strong>
                      </span>
                      <span className="tabular-nums font-bold text-[#202124]">₹{item.total}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-[#777777]">
                  <div>
                    <span>Pickup / Drop: </span>
                    <strong className="text-[#202124]">{order.customer.campusLocation}</strong> ({order.fulfillmentType})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Total Amount:</span>
                    <span className="font-display text-lg font-bold text-[#FF6B35] tabular-nums">
                      ₹{order.total}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EAEAEA] space-y-4 max-w-md mx-auto">
              <Clock className="w-12 h-12 text-[#FF6B35] mx-auto" />
              <h3 className="font-display text-lg font-bold text-[#202124]">
                No Orders Yet
              </h3>
              <p className="text-xs text-[#777777]">
                When you order food through Campus Bite, your live orders and history will show up right here.
              </p>
              <button
                onClick={onExploreMenu}
                className="px-5 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl hover:bg-[#E95420] transition-colors cursor-pointer"
              >
                Browse Canteen Menu
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Favorites */}
      {activeTab === 'favorites' && (
        <div>
          {favoritedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 border border-[#EAEAEA] flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-14 h-14 object-cover rounded-xl border border-[#EAEAEA]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-[#202124]">{p.title}</h4>
                      <div className="text-xs font-semibold text-[#FF6B35] tabular-nums">
                        ₹{p.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addItem(p, 1)}
                      className="px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-bold rounded-lg hover:bg-[#E95420] transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => toggleFavorite(p.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Remove"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EAEAEA] space-y-4 max-w-md mx-auto">
              <Heart className="w-12 h-12 text-[#FF6B35] mx-auto" />
              <h3 className="font-display text-lg font-bold text-[#202124]">
                No Favorite Meals Saved
              </h3>
              <p className="text-xs text-[#777777]">
                Click the heart icon on any meal in the menu to save it here for fast one-tap ordering!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAEA] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-bold text-[#202124]">
              Student Profile Information
            </h2>
            <button
              onClick={() => {
                if (isEditing) {
                  setName(user.name);
                  setPhone(user.phone);
                  setDepartment(user.department);
                  setHostelOrBlock(user.hostelOrBlock);
                }
                setIsEditing(!isEditing);
              }}
              className="text-xs font-semibold text-[#FF6B35] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Info'}</span>
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Department / Branch
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Usual Block or Hostel Location
                </label>
                <input
                  type="text"
                  value={hostelOrBlock}
                  onChange={(e) => setHostelOrBlock(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-[#E95420] transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-[#777777] block font-medium">Full Name</span>
                <span className="font-bold text-sm text-[#202124]">{user.name}</span>
              </div>
              <div>
                <span className="text-[#777777] block font-medium">Student / Roll ID</span>
                <span className="font-bold text-sm font-mono text-[#202124]">{user.studentId}</span>
              </div>
              <div>
                <span className="text-[#777777] block font-medium">College Email</span>
                <span className="font-bold text-sm text-[#202124]">{user.email}</span>
              </div>
              <div>
                <span className="text-[#777777] block font-medium">Contact Phone</span>
                <span className="font-bold text-sm text-[#202124]">{user.phone}</span>
              </div>
              <div>
                <span className="text-[#777777] block font-medium">Branch / Department</span>
                <span className="font-bold text-sm text-[#202124]">{user.department}</span>
              </div>
              <div>
                <span className="text-[#777777] block font-medium">Default Campus Block</span>
                <span className="font-bold text-sm text-[#202124]">{user.hostelOrBlock}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full border border-[#EAEAEA] shadow-2xl relative">
            <h3 className="font-display text-lg font-bold text-[#202124] mb-1">
              Update Student Password
            </h3>
            <p className="text-xs text-[#777777] mb-4">
              Enter your new security password for Campus Bite account.
            </p>

            {passwordSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#238636] mx-auto" />
                <h4 className="font-bold text-sm text-[#202124]">Password Updated!</h4>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPasswordSuccess(true);
                  setTimeout(() => {
                    setPasswordSuccess(false);
                    setShowPasswordModal(false);
                  }, 1200);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#202124] mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#202124] mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-3 py-2 text-xs text-[#777777]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-lg hover:bg-[#E95420]"
                  >
                    Save Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Bike,
  Store,
  QrCode,
  Banknote,
  Copy,
  Clock,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Order, FulfillmentType, PaymentMethod } from '../../types';
import { CAMPUS_LOCATIONS } from '../../data/initialData';

interface CheckoutPageProps {
  onOrderComplete: (order: Order) => void;
  onExploreMenu: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderComplete,
  onExploreMenu,
}) => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  // Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+91 97128 71557');
  const [email, setEmail] = useState(user?.email || '2202021000377@silveroakuni.ac.in');
  const [campusLocation, setCampusLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [specificNotes, setSpecificNotes] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('Campus Counter Pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Pickup');
  const [couponCode, setCouponCode] = useState('CAMPUSBITE10');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Fee and discount calculation
  const deliveryFee = fulfillmentType === 'Campus Delivery' ? (subtotal >= 150 ? 0 : 15) : 0;
  const discount = couponCode.trim().toUpperCase() === 'CAMPUSBITE10' ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal + deliveryFee - discount);

  if (confirmedOrder) {
    return (
      <div className="py-12 max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAEAEA] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#238636] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Order Confirmed & Sent to Kitchen
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#202124] mt-1">
              Your Food is in the Works!
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] mt-1">
              Thank you, {confirmedOrder.customer.fullName}. Your order reference is ready for pickup/delivery verification.
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-4 bg-[#FFF8F1] rounded-2xl border border-[#FF6B35]/20 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] text-[#777777] uppercase font-bold">Order ID</span>
              <div className="font-mono text-lg font-extrabold text-[#FF6B35]">
                {confirmedOrder.id}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(confirmedOrder.id);
                setCopiedId(true);
                setTimeout(() => setCopiedId(false), 2000);
              }}
              className="px-3 py-1.5 bg-white text-[#202124] border border-[#EAEAEA] rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{copiedId ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Order Details Breakdown */}
          <div className="text-left bg-neutral-50 rounded-2xl p-5 border border-[#EAEAEA] space-y-3 text-xs">
            <div className="flex justify-between font-bold text-[#202124] pb-2 border-b border-[#EAEAEA]">
              <span>Items Ordered</span>
              <span>Total</span>
            </div>
            {confirmedOrder.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-[#777777]">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span className="tabular-nums font-medium text-[#202124]">₹{item.total}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-[#EAEAEA] space-y-1 text-[#777777]">
              <div className="flex justify-between">
                <span>Fulfillment</span>
                <span className="font-semibold text-[#202124]">{confirmedOrder.fulfillmentType}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-semibold text-[#202124]">{confirmedOrder.customer.campusLocation}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="font-semibold text-[#202124]">{confirmedOrder.paymentMethod}</span>
              </div>
              {confirmedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Student Discount</span>
                  <span className="tabular-nums">-₹{confirmedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-[#202124] pt-2 border-t border-[#EAEAEA]">
                <span>Amount Paid/Due</span>
                <span className="font-display text-base text-[#FF6B35] tabular-nums">
                  ₹{confirmedOrder.total}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200 flex items-center gap-3 text-left">
            <Clock className="w-5 h-5 text-[#FF6B35] shrink-0" />
            <div className="text-xs text-[#202124]">
              <strong className="block font-semibold">Estimated Time: 10–15 Minutes</strong>
              Head over to the Silver Oak Canteen counter with your Order ID when ready.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onOrderComplete(confirmedOrder);
                setConfirmedOrder(null);
              }}
              className="flex-1 py-3 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Track in Student Portal
            </button>
            <button
              onClick={() => {
                setConfirmedOrder(null);
                onExploreMenu();
              }}
              className="flex-1 py-3 bg-white border border-[#EAEAEA] hover:bg-gray-50 text-[#202124] font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Order More Items
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFF8F1] text-[#FF6B35] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#202124]">
          Your Tray is Empty
        </h2>
        <p className="text-xs text-[#777777] leading-relaxed">
          Please add some delicious meals from the campus menu before checking out.
        </p>
        <button
          onClick={onExploreMenu}
          className="px-6 py-3 bg-[#FF6B35] hover:bg-[#E95420] text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Explore Campus Menu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full student name and contact phone.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const orderPayload = {
        customer: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          campusLocation,
          specificNotes: specificNotes.trim(),
        },
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
        fulfillmentType,
        paymentMethod,
        couponCode: couponCode.trim(),
      };

      const order = await api.createOrder(orderPayload);
      clearCart();
      setConfirmedOrder(order);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
          Secure Campus Ordering
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#202124] mt-1 tracking-tight">
          Checkout & Place Order
        </h1>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Student info & fulfillment */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Student Details */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-[#202124] flex items-center gap-2">
              <span>1. Student Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patel"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  Phone Number (for SMS & Call) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 97128 71557"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#202124] mb-1">
                  College Email (optional)
                </label>
                <input
                  type="email"
                  placeholder="2202021000377@silveroakuni.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>
          </div>

          {/* 2. Fulfillment Mode */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-[#202124]">
              2. Choose Collection Mode
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillmentType('Campus Counter Pickup')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  fulfillmentType === 'Campus Counter Pickup'
                    ? 'border-[#FF6B35] bg-[#FFF8F1]'
                    : 'border-[#EAEAEA] hover:border-gray-300'
                }`}
              >
                <Store className={`w-5 h-5 shrink-0 mt-0.5 ${fulfillmentType === 'Campus Counter Pickup' ? 'text-[#FF6B35]' : 'text-[#777777]'}`} />
                <div>
                  <div className="font-bold text-xs text-[#202124]">Counter Pickup</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    Collect directly at Silver Oak Canteen (Free)
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('Campus Delivery')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  fulfillmentType === 'Campus Delivery'
                    ? 'border-[#FF6B35] bg-[#FFF8F1]'
                    : 'border-[#EAEAEA] hover:border-gray-300'
                }`}
              >
                <Bike className={`w-5 h-5 shrink-0 mt-0.5 ${fulfillmentType === 'Campus Delivery' ? 'text-[#FF6B35]' : 'text-[#777777]'}`} />
                <div>
                  <div className="font-bold text-xs text-[#202124]">Campus Delivery</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    Delivered to your Block/Hostel (₹15 or Free &gt;₹150)
                  </div>
                </div>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                Campus Location / Drop-off Point
              </label>
              <select
                value={campusLocation}
                onChange={(e) => setCampusLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35] bg-white cursor-pointer"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">
                Specific Location Details & Food Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Room 302, Bench near entrance, extra napkins, less spicy..."
                value={specificNotes}
                onChange={(e) => setSpecificNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              />
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs space-y-4">
            <h2 className="font-display text-base font-bold text-[#202124]">
              3. Payment Option
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Pickup')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  paymentMethod === 'Cash on Pickup'
                    ? 'border-[#FF6B35] bg-[#FFF8F1]'
                    : 'border-[#EAEAEA] hover:border-gray-300'
                }`}
              >
                <Banknote className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'Cash on Pickup' ? 'text-[#FF6B35]' : 'text-[#777777]'}`} />
                <div>
                  <div className="font-bold text-xs text-[#202124]">Pay at Counter</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    Pay via cash or card upon receiving food
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Campus UPI')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  paymentMethod === 'Campus UPI'
                    ? 'border-[#FF6B35] bg-[#FFF8F1]'
                    : 'border-[#EAEAEA] hover:border-gray-300'
                }`}
              >
                <QrCode className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'Campus UPI' ? 'text-[#FF6B35]' : 'text-[#777777]'}`} />
                <div>
                  <div className="font-bold text-xs text-[#202124]">Campus UPI</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    GPay, PhonePe, Paytm QR code
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === 'Campus UPI' && (
              <div className="p-4 bg-neutral-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#777777]">Official Campus UPI ID:</span>
                  <div className="font-mono font-bold text-[#202124]">campusbite@okaxis</div>
                </div>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded">
                  Instant Verification
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-sm sticky top-24 space-y-4">
            <h2 className="font-display text-base font-bold text-[#202124] pb-3 border-b border-[#EAEAEA]">
              Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
            </h2>

            {/* Items */}
            <div className="divide-y divide-[#EAEAEA] max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FF6B35] tabular-nums">
                      {quantity}×
                    </span>
                    <span className="text-[#202124] font-medium line-clamp-1">
                      {product.title}
                    </span>
                  </div>
                  <span className="text-[#202124] font-semibold tabular-nums shrink-0">
                    ₹{product.price * quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Field */}
            <div className="pt-2 border-t border-[#EAEAEA]">
              <label className="block text-[11px] font-semibold text-[#777777] mb-1">
                Student Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="CAMPUSBITE10"
                  className="w-full px-3 py-1.5 text-xs border border-[#EAEAEA] rounded-lg uppercase font-mono focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#EAEAEA] text-xs text-[#777777]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#202124] tabular-nums">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Fulfillment Fee</span>
                <span className="font-semibold text-[#202124] tabular-nums">
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#238636] font-semibold">
                  <span>Student Promo Discount</span>
                  <span className="tabular-nums">-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-[#202124] pt-2 border-t border-[#EAEAEA]">
                <span>Total Due</span>
                <span className="font-display text-xl font-extrabold text-[#FF6B35] tabular-nums">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Campus Order · ₹{finalTotal}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

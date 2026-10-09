import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, Check, Bike } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onExploreMenu,
}) => {
  const { items, updateQuantity, removeItem, clearCart, subtotal, isDrawerOpen, closeDrawer } =
    useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const discount = appliedCoupon === 'CAMPUSBITE10' ? Math.round(subtotal * 0.1) : 0;
  const estimatedTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'CAMPUSBITE10') {
      setAppliedCoupon('CAMPUSBITE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EAEAEA]">
          {/* Header */}
          <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFF8F1] flex items-center justify-center text-[#FF6B35]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-display text-base font-bold text-[#202124]">
                Your Campus Tray
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-lg text-[#777777] hover:text-[#202124] hover:bg-black/5 cursor-pointer"
              aria-label="Close tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs text-[#777777] pb-2 border-b border-[#EAEAEA]">
                  <span>{items.reduce((acc, i) => acc + i.quantity, 0)} Items Selected</span>
                  <button
                    onClick={clearCart}
                    className="hover:text-[#D93025] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#EAEAEA]">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-14 h-14 object-cover rounded-xl border border-[#EAEAEA] bg-neutral-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-[#202124] line-clamp-1">
                            {product.title}
                          </h4>
                          <span className="text-[11px] text-[#777777] tabular-nums">
                            ₹{product.price} each
                          </span>
                          <div className="text-xs font-bold text-[#202124] tabular-nums pt-0.5">
                            ₹{product.price * quantity}
                          </div>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 bg-[#FFF8F1] border border-[#EAEAEA] rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#202124] hover:bg-[#FF6B35] hover:text-white transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#202124] w-4 text-center tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#202124] hover:bg-[#FF6B35] hover:text-white transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-3 border-t border-[#EAEAEA]">
                  {appliedCoupon ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Code CAMPUSBITE10 Applied (-10%)</span>
                      </div>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-xs text-[#777777] hover:text-[#D93025] cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Coupon (e.g. CAMPUSBITE10)"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs border border-[#EAEAEA] rounded-lg uppercase font-mono focus:outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Campus note */}
                <div className="p-3 bg-[#FFF8F1] rounded-xl border border-[#FF6B35]/20 flex items-start gap-2.5 text-xs text-[#777777]">
                  <Bike className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                  <span>
                    Pick up in person for ₹0 fee or choose quick delivery across Silver Oak University blocks at checkout.
                  </span>
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="text-center py-20 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFF8F1] text-[#FF6B35] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#202124]">
                  Your Tray is Empty
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed max-w-xs mx-auto">
                  Looks like you haven't added any campus meals yet. Check out today's fresh canteen menu!
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    onExploreMenu();
                  }}
                  className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E95420] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAEAEA] bg-neutral-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-[#777777]">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-[#202124] tabular-nums">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Student Discount (10%)</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#202124] pt-2 border-t border-[#EAEAEA]">
                  <span>Total Amount</span>
                  <span className="font-display text-lg tabular-nums text-[#FF6B35]">
                    ₹{estimatedTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeDrawer();
                  onNavigateToCheckout();
                }}
                className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Clock, Tag, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAEAEA] relative animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-[#202124] hover:bg-white shadow-sm transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-neutral-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isVegetarian && (
              <div className="absolute top-4 left-4 w-6 h-6 bg-white rounded-sm p-1 border border-emerald-600 flex items-center justify-center shadow-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & prep time */}
              <div className="flex items-center gap-2 text-xs text-[#777777] mb-1.5">
                <span className="font-semibold text-[#FF6B35]">{product.category}</span>
                {product.prepTimeMinutes && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{product.prepTimeMinutes} mins
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-display text-2xl font-bold text-[#202124] mb-2">
                {product.title}
              </h2>

              <p className="text-sm text-[#777777] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-[11px] text-[#777777] bg-[#FFF8F1] px-2.5 py-1 rounded-md border border-[#EAEAEA]"
                  >
                    <Tag className="w-2.5 h-2.5 text-[#FF6B35]" />
                    {t}
                  </span>
                ))}
              </div>

              {/* Pricing */}
              <div className="pt-2 border-t border-[#EAEAEA] flex items-baseline gap-2">
                <span className="text-xs text-[#777777] font-medium">Student Price:</span>
                <span className="font-display text-3xl font-extrabold text-[#202124] tabular-nums">
                  ₹{product.price}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EAEAEA] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#202124]">Select Quantity:</span>
                <div className="flex items-center gap-3 bg-[#FFF8F1] border border-[#EAEAEA] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#202124] hover:bg-[#FF6B35] hover:text-white transition-colors cursor-pointer disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-[#202124] w-6 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#202124] hover:bg-[#FF6B35] hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#FF6B35] hover:bg-[#E95420] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart · ₹{product.price * quantity}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

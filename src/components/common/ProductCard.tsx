import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { items, addItem, updateQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useAuth();
  const [imgError, setImgError] = useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const isInCart = Boolean(cartItem);
  const favorited = isFavorite(product.id);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-orange-50/50 p-4 text-center">
            <ShoppingBag className="w-8 h-8 text-[#FF6B35]/40 mb-2" />
            <span className="text-xs font-semibold text-[#202124]">{product.title}</span>
          </div>
        )}

        {/* Veg Marker (Standard Indian Veg Symbol: Green circle inside square) */}
        {product.isVegetarian && (
          <div
            title="Vegetarian"
            className="absolute top-3 left-3 w-5 h-5 bg-white/95 rounded-sm p-0.5 border border-emerald-600 flex items-center justify-center shadow-xs"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
            favorited
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/85 text-[#777777] hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-white/95 text-[#202124] hover:text-[#FF6B35] shadow-sm text-xs font-medium flex items-center gap-1 cursor-pointer"
            title="Quick Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        )}

        {/* Unavailable overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-neutral-800 text-white text-xs font-bold rounded-md">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Prep Time */}
          <div className="flex items-center gap-1.5 text-xs text-[#777777] mb-1">
            <span>{product.category}</span>
            {product.prepTimeMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>~{product.prepTimeMinutes} mins</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView && onQuickView(product)}
            className="font-display font-bold text-base text-[#202124] hover:text-[#FF6B35] transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          {/* Product Description */}
          <p className="text-xs text-[#777777] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & Add to Cart Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA]">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#777777] font-medium">Price</span>
            <span className="font-display text-lg font-bold text-[#202124] tabular-nums">
              ₹{product.price}
            </span>
          </div>

          <div>
            {!product.isAvailable ? (
              <span className="text-xs text-[#777777] font-medium">Unavailable</span>
            ) : isInCart && cartItem ? (
              <div className="flex items-center gap-2 bg-[#FFF8F1] border border-[#FF6B35]/30 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  className="w-6 h-6 rounded flex items-center justify-center text-[#202124] hover:bg-[#FF6B35] hover:text-white transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#202124] w-4 text-center tabular-nums">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="w-6 h-6 rounded flex items-center justify-center text-[#202124] hover:bg-[#FF6B35] hover:text-white transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addItem(product, 1)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#FF6B35] hover:bg-[#E95420] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

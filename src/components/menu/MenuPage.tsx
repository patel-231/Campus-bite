import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { Product, FoodCategory } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { ProductQuickView } from './ProductQuickView';

interface MenuPageProps {
  products: Product[];
}

export const MenuPage: React.FC<MenuPageProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const categories: { id: FoodCategory; label: string }[] = [
    { id: 'All', label: 'All Items' },
    { id: 'Indian Street Food', label: 'Indian Street Food' },
    { id: 'Burgers & Sandwiches', label: 'Burgers & Sandwiches' },
    { id: 'Snacks & Puffs', label: 'Snacks & Puffs' },
    { id: 'Beverages', label: 'Beverages' },
    { id: 'Desserts', label: 'Desserts' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Search
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchTag) return false;
        }
        // Availability
        if (onlyAvailable && !product.isAvailable) {
          return false;
        }
        // Price
        if (product.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        // Featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchTerm, onlyAvailable, maxPrice, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('featured');
    setOnlyAvailable(false);
    setMaxPrice(100);
  };

  const isFiltered =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    onlyAvailable ||
    maxPrice < 100 ||
    sortBy !== 'featured';

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6B35] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Canteen Fresh Catalogue</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#202124] mt-1 tracking-tight">
          Explore Campus Bite Menu
        </h1>
        <p className="text-sm text-[#777777] mt-1 max-w-2xl">
          Order authentic street food, crispy snacks, refreshing cold brews, and desserts crafted for student life.
        </p>
      </div>

      {/* Search & Top Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by meal name, ingredient, or tag (e.g. Vada Pav, Coffee, Maggi)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(9);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-[#202124]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter / Sort bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-[#EAEAEA] rounded-xl px-3 py-2 text-xs font-medium">
            <span className="text-[#777777]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#202124] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Filter toggle button on mobile */}
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#EAEAEA] rounded-xl text-xs font-semibold cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Filters</span>
          </button>

          {/* Reset Filters button if any filter is active */}
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#E95420] hover:bg-[#FFF8F1] rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Filters Bar */}
      <div className="space-y-4 mb-8">
        {/* Horizontal Category Switcher */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max p-1 bg-white rounded-xl border border-[#EAEAEA]">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'All'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(9);
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#FF6B35] text-white shadow-xs'
                      : 'text-[#202124] hover:bg-black/5 hover:text-[#FF6B35]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[11px] tabular-nums ${isSelected ? 'text-white/80' : 'text-[#777777]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extended filters (Desktop or open on mobile) */}
        <div className={`p-4 bg-white rounded-2xl border border-[#EAEAEA] flex flex-wrap items-center justify-between gap-6 ${showFiltersMobile ? 'block' : 'hidden md:flex'}`}>
          {/* Max Price Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#777777]">Max Price:</span>
            <input
              type="range"
              min="50"
              max="100"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#FF6B35] cursor-pointer w-28 sm:w-36"
            />
            <span className="text-xs font-bold text-[#202124] tabular-nums">
              Up to ₹{maxPrice}
            </span>
          </div>

          {/* In-Stock Only Toggle */}
          <label className="flex items-center gap-2 text-xs font-medium text-[#202124] cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="accent-[#FF6B35] rounded-sm w-4 h-4 cursor-pointer"
            />
            <span>Show In-Stock Only</span>
          </label>

          {/* Results Summary */}
          <div className="text-xs text-[#777777]">
            Showing <strong className="text-[#202124] tabular-nums">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2.5 text-xs font-bold text-[#202124] bg-white border border-[#EAEAEA] hover:border-[#FF6B35] hover:text-[#FF6B35] rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Load More Meals ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EAEAEA] p-8 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FFF8F1] text-[#FF6B35] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-[#202124]">
            No Meals Found
          </h3>
          <p className="text-xs text-[#777777] leading-relaxed">
            We couldn't find any items matching your selected criteria. Try adjusting your search query or reset your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-bold text-white bg-[#FF6B35] hover:bg-[#E95420] rounded-xl transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

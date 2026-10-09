import React from 'react';
import { FoodCategory } from '../../types';

interface CategoryBarProps {
  categories: { id: FoodCategory; label: string; count: number }[];
  selectedCategory: FoodCategory;
  onSelectCategory: (cat: FoodCategory) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max p-1 bg-white/70 backdrop-blur-xs rounded-xl border border-[#EAEAEA]">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-[#FF6B35] text-white shadow-xs'
                  : 'text-[#202124] hover:bg-black/5 hover:text-[#FF6B35]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] tabular-nums ${
                  isSelected ? 'text-white/80' : 'text-[#777777]'
                }`}
              >
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

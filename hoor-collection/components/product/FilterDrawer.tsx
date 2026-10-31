'use client';

import React from 'react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
}) => {
  if (!isOpen) return null;

  const categories = [
    { label: 'All Collections', value: '' },
    { label: 'Formal Kaftans & Sets', value: 'Formal' },
    { label: 'Semi-Formal 2PC', value: 'Semi-Formal' },
    { label: 'Bridal Couture', value: 'Bridal' },
  ];

  const sortOptions = [
    { label: 'Featured Atelier Picks', value: 'featured' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Royal Black Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141414] border-l border-[#D4AF37]/30 text-white p-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#D4AF37]">
                Filter & Refine
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-[#D4AF37] text-xl p-1"
                aria-label="Close Filter Drawer"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#f4e0ae] font-semibold">
                Category
              </h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => onSelectCategory(cat.value)}
                    className={`w-full text-left px-4 py-2.5 rounded text-sm transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === cat.value
                        ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                        : 'bg-[#1a1a1a] text-white hover:bg-[#262626] border border-[#D4AF37]/20'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Strategy */}
            <div className="space-y-3 pt-4 border-t border-[#1a1a1a]">
              <h4 className="text-xs uppercase tracking-widest text-[#f4e0ae] font-semibold">
                Sort Strategy
              </h4>
              <div className="space-y-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onSelectSort(opt.value)}
                    className={`w-full text-left px-4 py-2.5 rounded text-sm transition-all duration-200 flex items-center justify-between ${
                      selectedSort === opt.value
                        ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                        : 'bg-[#1a1a1a] text-white hover:bg-[#262626] border border-[#D4AF37]/20'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedSort === opt.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D4AF37]/20">
            <button
              onClick={onClose}
              className="w-full py-3 text-sm uppercase tracking-wider font-semibold rounded bg-[#D4AF37] text-black hover:bg-[#f4e0ae] transition-colors"
            >
              Apply Selections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;

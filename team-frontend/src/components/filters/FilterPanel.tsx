import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Category } from '../../types/filters';

interface FilterPanelProps {
  categories: Category[];
  selectedCategory?: number;
  selectedLevel?: string;
  selectedPrice?: string;
  onCategoryChange: (categoryId: number | undefined) => void;
  onLevelChange: (level: string | undefined) => void;
  onPriceChange: (price: string | undefined) => void;
  onClearAll: () => void;
  activeFiltersCount: number;
  isMobile?: boolean;
  onClose?: () => void;
}

const LEVELS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' }
];

const PRICE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' }
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  selectedLevel,
  selectedPrice,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
  onClearAll,
  activeFiltersCount,
  isMobile = false,
  onClose
}) => {
  return (
    <div className={`${isMobile ? 'fixed inset-0 z-50 bg-white' : 'bg-white rounded-lg border border-gray-200'}`}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}
      
      <div className={`${isMobile ? 'p-4 space-y-6' : 'p-6 space-y-6'}`}>
        {/* Clear All Button */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </span>
            <button
              onClick={onClearAll}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Level</h3>
          <div className="space-y-2">
            <button
              onClick={() => onLevelChange(undefined)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedLevel
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Levels
            </button>
            {LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => onLevelChange(level.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedLevel === level.value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price</h3>
          <div className="space-y-2">
            {PRICE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onPriceChange(option.value === 'all' ? undefined : option.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  (selectedPrice === undefined && option.value === 'all') ||
                  selectedPrice === option.value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

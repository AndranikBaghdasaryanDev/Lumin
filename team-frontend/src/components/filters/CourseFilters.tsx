import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CategoryFilter } from './CategoryFilter';
import { Button } from '../ui/Button';
import { useToastStore } from '../../stores/toastStore';

interface CourseFiltersProps {
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

type Level = 'all' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
type PriceFilter = 'all' | 'free' | 'paid';

export const CourseFilters: React.FC<CourseFiltersProps> = ({ 
  className = '', 
  isMobile = false,
  onClose 
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success } = useToastStore();
  
  const [selectedLevel, setSelectedLevel] = useState<Level>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>('all');

  // Initialize state from URL params
  useEffect(() => {
    const level = searchParams.get('level') as Level || 'all';
    const price = searchParams.get('price') as PriceFilter || 'all';
    
    setSelectedLevel(level);
    setSelectedPrice(price);
  }, [searchParams]);

  const updateFilters = (updates: {
    level?: Level;
    price?: PriceFilter;
  }) => {
    const params = new URLSearchParams(searchParams);
    
    if (updates.level) {
      if (updates.level === 'all') {
        params.delete('level');
      } else {
        params.set('level', updates.level);
      }
      setSelectedLevel(updates.level);
    }
    
    if (updates.price) {
      if (updates.price === 'all') {
        params.delete('price');
      } else {
        params.set('price', updates.price);
      }
      setSelectedPrice(updates.price);
    }
    
    params.delete('page'); // Reset to page 1 when filter changes
    navigate(`/courses?${params.toString()}`);
    
    if (isMobile && onClose) {
      onClose();
    }
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    
    // Keep only search parameter if it exists
    const search = searchParams.get('search');
    if (search) {
      params.set('search', search);
    }
    
    navigate(`/courses?${params.toString()}`);
    setSelectedLevel('all');
    setSelectedPrice('all');
    
    success('All filters cleared');
    
    if (isMobile && onClose) {
      onClose();
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedLevel !== 'all') count++;
    if (selectedPrice !== 'all') count++;
    if (searchParams.get('categoryId')) count++;
    return count;
  };

  const levels: { value: Level; label: string }[] = [
    { value: 'all', label: 'All Levels' },
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' },
  ];

  const priceFilters: { value: PriceFilter; label: string }[] = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
  ];

  const filterContent = (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <CategoryFilter className="border-0 shadow-none p-0" />

      {/* Level Filter */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Level</h4>
        <div className="space-y-2">
          {levels.map((level) => (
            <label
              key={level.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="level"
                value={level.value}
                checked={selectedLevel === level.value}
                onChange={() => updateFilters({ level: level.value })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className={`ml-3 text-sm ${
                selectedLevel === level.value
                  ? 'text-blue-700 font-medium'
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {level.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Price</h4>
        <div className="space-y-2">
          {priceFilters.map((filter) => (
            <label
              key={filter.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                value={filter.value}
                checked={selectedPrice === filter.value}
                onChange={() => updateFilters({ price: filter.value })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className={`ml-3 text-sm ${
                selectedPrice === filter.value
                  ? 'text-blue-700 font-medium'
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {filter.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
        <div className="bg-white w-full max-w-sm h-full overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            {filterContent}
          </div>
        </div>
      </div>
    );
  }

  return filterContent;
};

export default CourseFilters;

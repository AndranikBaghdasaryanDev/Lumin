import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterButtonProps {
  activeFiltersCount: number;
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ activeFiltersCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <FunnelIcon className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Filters</span>
      {activeFiltersCount > 0 && (
        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};

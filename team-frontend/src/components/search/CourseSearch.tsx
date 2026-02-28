import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToastStore } from '../../stores/toastStore';

interface CourseSearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const CourseSearch: React.FC<CourseSearchProps> = ({ 
  className = '',
  placeholder = 'Search courses...',
  onSearch
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success } = useToastStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Initialize search query from URL params
  useEffect(() => {
    const initialQuery = searchParams.get('search') || '';
    setSearchQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [searchParams]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery !== searchQuery) {
        setDebouncedQuery(searchQuery);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== (searchParams.get('search') || '')) {
      updateSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const updateSearch = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when search changes
    params.delete('page');
    
    navigate(`/courses?${params.toString()}`);
    
    if (onSearch) {
      onSearch(query.trim());
    }
  }, [searchParams, navigate, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    success('Search cleared');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
  };

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
        
        {hasQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>
      
      {/* Search hint for mobile */}
      <div className="mt-2 text-xs text-gray-500 sm:hidden">
        Press Enter to search
      </div>
    </form>
  );
};

export default CourseSearch;

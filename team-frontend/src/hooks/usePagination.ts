import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PaginationMeta, PageChangeHandler } from '../types/pagination.types';

interface UsePaginationOptions {
  fetchPage: PageChangeHandler;
  defaultPage?: number;
  resetOnFilterChange?: string[];
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  paginationMeta: PaginationMeta | null;
  handlePageChange: (page: number) => void;
  resetToPageOne: () => void;
  setPaginationMeta: (meta: PaginationMeta) => void;
  setIsLoading: (loading: boolean) => void;
}

export const usePagination = ({
  fetchPage,
  defaultPage = 1,
  resetOnFilterChange = []
}: UsePaginationOptions): UsePaginationReturn => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  // Get current page from URL or default
  const currentPage = parseInt(searchParams.get('page') || defaultPage.toString());
  const totalPages = paginationMeta?.totalPages || 1;

  // Reset to page 1 when filters change
  useEffect(() => {
    // This effect will trigger when any filter parameter changes
    if (resetOnFilterChange.length > 0) {
      const pageParam = searchParams.get('page');
      if (pageParam && pageParam !== '1') {
        // Reset to page 1 if filters changed and we're not on page 1
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '1');
        window.history.replaceState(null, '', `?${newParams.toString()}`);
        fetchPage(1);
      }
    }
  }, [searchParams.toString(), fetchPage, resetOnFilterChange]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    fetchPage(page);
  };

  const resetToPageOne = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    window.history.replaceState(null, '', `?${newParams.toString()}`);
    fetchPage(1);
  };

  return {
    currentPage,
    totalPages,
    isLoading,
    paginationMeta,
    handlePageChange,
    resetToPageOne,
    setPaginationMeta,
    setIsLoading
  };
};

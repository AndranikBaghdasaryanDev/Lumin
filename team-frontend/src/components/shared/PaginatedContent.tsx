import React from 'react';
import Pagination from '../shared/Pagination';
import { usePagination } from '../../hooks/usePagination';
import type { PaginationMeta } from '../../types/pagination.types';

interface PaginatedContentProps {
  fetchData: (page: number) => Promise<{ data: any[]; pagination: PaginationMeta }>;
  resetOnFilterChange?: string[];
  renderItem: (item: any, index: number) => React.ReactNode;
  emptyMessage?: string;
  loadingMessage?: string;
}

const PaginatedContent: React.FC<PaginatedContentProps> = ({
  fetchData,
  resetOnFilterChange = [],
  renderItem,
  emptyMessage = 'No items found.',
  loadingMessage = 'Loading...'
}) => {
  const [data, setData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const {
    currentPage,
    isLoading,
    paginationMeta,
    handlePageChange,
    setPaginationMeta,
    setIsLoading
  } = usePagination({
    fetchPage: async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchData(page);
        setData(result.data);
        setPaginationMeta(result.pagination);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    resetOnFilterChange
  });

  // Initial data fetch
  React.useEffect(() => {
    handlePageChange(currentPage);
  }, []);

  if (isLoading && data.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">{loadingMessage}</span>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button 
          onClick={() => handlePageChange(currentPage)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Content */}
      <div className="space-y-4">
        {data.map((item, index) => renderItem(item, index))}
      </div>

      {/* Loading overlay for pagination */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Pagination */}
      {paginationMeta && paginationMeta.totalPages > 1 && (
        <div className="flex justify-center pt-8 border-t border-gray-200">
          <Pagination
            currentPage={paginationMeta.page}
            totalPages={paginationMeta.totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default PaginatedContent;

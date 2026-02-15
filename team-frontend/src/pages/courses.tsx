import React, { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import CourseCard from '../components/reusable/CourseCard';
import { FilterPanel } from '../components/filters/FilterPanel';
import { FilterButton } from '../components/filters/FilterButton';
import type { Category } from '../types/filters';

// Mock categories - in a real app, these would come from an API
const mockCategories: Category[] = [
  { id: 1, name: 'Development' },
  { id: 2, name: 'Design' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Marketing' },
  { id: 5, name: 'Photography' },
];

export const CoursesPage: React.FC = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const {
    coursesData,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    getActiveFiltersCount,
  } = useCourses();

  const handleCategoryChange = (categoryId: number | undefined) => {
    updateFilters({ categoryId });
  };

  const handleLevelChange = (level: string | undefined) => {
    updateFilters({ level: level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | undefined });
  };

  const handlePriceChange = (price: string | undefined) => {
    if (price === undefined) {
      updateFilters({ isFree: undefined });
    } else {
      updateFilters({ isFree: price === 'free' });
    }
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  if (loading && !coursesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-2">Error</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <FilterPanel
              categories={mockCategories}
              selectedCategory={filters.categoryId}
              selectedLevel={filters.level}
              selectedPrice={filters.isFree === undefined ? undefined : filters.isFree ? 'free' : 'paid'}
              onCategoryChange={handleCategoryChange}
              onLevelChange={handleLevelChange}
              onPriceChange={handlePriceChange}
              onClearAll={clearFilters}
              activeFiltersCount={getActiveFiltersCount()}
              isMobile={true}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600">
            {coursesData?.pagination.total || 0} courses available
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              categories={mockCategories}
              selectedCategory={filters.categoryId}
              selectedLevel={filters.level}
              selectedPrice={filters.isFree === undefined ? undefined : filters.isFree ? 'free' : 'paid'}
              onCategoryChange={handleCategoryChange}
              onLevelChange={handleLevelChange}
              onPriceChange={handlePriceChange}
              onClearAll={clearFilters}
              activeFiltersCount={getActiveFiltersCount()}
              isMobile={false}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <FilterButton
                activeFiltersCount={getActiveFiltersCount()}
                onClick={() => setIsMobileFilterOpen(true)}
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Courses Grid */}
            {!loading && coursesData && (
              <>
                {coursesData.courses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-2">No courses found</div>
                    <p className="text-gray-400">Try adjusting your filters</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {coursesData.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {coursesData.pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-12">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePageChange(filters.page! - 1)}
                            disabled={filters.page! <= 1}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          
                          <span className="px-4 py-2 text-sm text-gray-600">
                            Page {filters.page} of {coursesData.pagination.totalPages}
                          </span>
                          
                          <button
                            onClick={() => handlePageChange(filters.page! + 1)}
                            disabled={filters.page! >= coursesData.pagination.totalPages}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

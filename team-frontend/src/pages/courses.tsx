import React, { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import CourseCard from '../components/reusable/CourseCard';
import { FilterPanel } from '../components/filters/FilterPanel';
import { FilterButton } from '../components/filters/FilterButton';
import type { Category } from '../types/filters';
import { BookOpen, Search, SortAsc } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'price_low' | 'price_high' | undefined>();
  
  const {
    coursesData,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    getActiveFiltersCount,
    refetch,
  } = useCourses();

  // Debug logging
  console.log("🎨 CoursesPage render - coursesData:", coursesData);
  console.log("🎨 CoursesPage render - loading:", loading);
  console.log("🎨 CoursesPage render - error:", error);
  console.log("🎨 CoursesPage render - courses count:", coursesData?.courses?.length);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    updateFilters({ search: term || undefined });
  };

  const handleSortChange = (sort: 'newest' | 'price_low' | 'price_high' | undefined) => {
    setSortOrder(sort);
    updateFilters({ sort });
  };

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

  if (error && error.trim() !== '') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <FilterPanel
              categories={mockCategories}
              selectedCategory={filters?.categoryId}
              selectedLevel={filters?.level}
              selectedPrice={filters?.isFree === undefined ? undefined : filters?.isFree ? 'free' : 'paid'}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {coursesData?.pagination?.total || 0} courses available • Find your perfect learning journey
          </p>
          
          {/* Search and Sort Bar */}
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <SortAsc className="w-5 h-5 text-gray-600" />
              <select
                value={sortOrder || ''}
                onChange={(e) => handleSortChange(e.target.value as 'newest' | 'price_low' | 'price_high' | undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              >
                <option value="">Sort by</option>
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <FilterPanel
                categories={mockCategories}
                selectedCategory={filters?.categoryId}
                selectedLevel={filters?.level}
                selectedPrice={filters?.isFree === undefined ? undefined : filters?.isFree ? 'free' : 'paid'}
                onCategoryChange={handleCategoryChange}
                onLevelChange={handleLevelChange}
                onPriceChange={handlePriceChange}
                onClearAll={clearFilters}
                activeFiltersCount={getActiveFiltersCount()}
                isMobile={false}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-8">
              <FilterButton
                activeFiltersCount={getActiveFiltersCount()}
                onClick={() => setIsMobileFilterOpen(true)}
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading courses...</p>
                </div>
              </div>
            )}

            {/* Courses Grid */}
            {!loading && coursesData && (
              <>
                {console.log("📊 All courses data:", coursesData.courses)}
                {console.log("🔢 Courses count:", coursesData.courses?.length)}
                {console.log("🆔 Course IDs:", coursesData.courses?.map(c => c.id))}
                {console.log("🖼️ Course thumbnails:", coursesData.courses?.map(c => c.thumbnailUrl))}
                
                {(coursesData?.courses?.length || 0) === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
                    <p className="text-gray-500">Try adjusting your filters or check back later</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {coursesData?.courses?.map((course) => {
                        console.log("🎯 Rendering course card for:", course.id, course.title);
                        
                        if (!course.id) {
                          console.error("❌ Course missing ID:", course);
                          return null; // Don't render cards without ID
                        }
                        
                        return (
                          <div key={course.id} className="transform transition-all duration-300 hover:scale-105">
                            <CourseCard course={course} />
                          </div>
                        );
                      }) || []}
                    </div>

                    {/* Pagination */}
                    {coursesData?.pagination?.totalPages && coursesData.pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-16">
                        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
                          <button
                            onClick={() => handlePageChange((filters?.page || 1) - 1)}
                            disabled={(filters?.page || 1) <= 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
                          >
                            Previous
                          </button>
                          
                          <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                            Page {(filters?.page || 1)} of {coursesData?.pagination?.totalPages || 1}
                          </span>
                          
                          <button
                            onClick={() => handlePageChange((filters?.page || 1) + 1)}
                            disabled={(filters?.page || 1) >= (coursesData?.pagination?.totalPages || 1)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
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

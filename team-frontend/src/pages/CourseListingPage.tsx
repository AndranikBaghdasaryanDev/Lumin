import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { CourseCard } from "../components/course/CourseCard";
import { CourseSearch } from "../components/search/CourseSearch";
import { CourseFilters } from "../components/filters/CourseFilters";
import { Pagination } from "../components/pagination/Pagination";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { Axios } from "../lib/api/axios";
import type { ApiResponse } from "../lib/api/types";
import type { CourseListItem, CourseApiData } from "../types";
import { useToastStore } from "../stores/toastStore";

export default function CoursesListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { error } = useToastStore();
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;
  const categoryId = searchParams.get("categoryId");
  const level = searchParams.get("level");
  const price = searchParams.get("price");

  // Calculate pagination
  const limit = 12; // 12 courses per page
  const totalPages = Math.ceil(total / limit);

  // Fetch courses
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);

        const query = new URLSearchParams({
          search,
          sort,
          page: page.toString(),
          limit: limit.toString(),
          ...(categoryId && { categoryId }),
          ...(level && { level }),
          ...(price && { price }),
        }).toString();

        const res = await Axios.get<ApiResponse<CourseApiData>>(`/api/courses?${query}`);
        const data = res.data.data

        setCourses(data?.courses || []);
        setTotal(data?.total || 0);
      } catch (err) {
        error("Failed to load courses. Please try again.");
        setCourses([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [search, sort, page, categoryId, level, price, limit, error]);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      search,
      sort: e.target.value,
      page: "1", // reset page when sort changes
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filters Button */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Courses {total > 0 && `(${total.toLocaleString()})`}
          </h1>
          <Button
            onClick={() => setShowMobileFilters(true)}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <CourseFilters />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Courses {total > 0 && `(${total.toLocaleString()})`}
              </h1>
              
              <div className="flex items-center gap-4">
                <CourseSearch 
                  className="w-80"
                  placeholder="Search courses..."
                />
                
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden mb-6">
              <CourseSearch />
              
              <div className="mt-4">
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                    <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                    <Skeleton className="h-4 w-3/4 mb-2 rounded" />
                    <Skeleton className="h-4 w-1/2 mb-4 rounded" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-4 w-16 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && courses.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}

            {/* Courses Grid */}
            {!loading && courses.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <CourseFilters
          isMobile
          onClose={() => setShowMobileFilters(false)}
        />
      )}
    </div>
  );
}
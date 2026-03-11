import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { Pagination } from "../components/pagination/Pagination";
import { Skeleton } from "../components/ui/Skeleton";
import { categoryService } from "../lib/api/service/categoryService";
import { useToastStore } from "../stores/toastStore";
import { fetchCourses } from "../services/courseService";
import type { Category, CourseLevel, CourseListItem } from "../types/course";

const CoursesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toastError = useToastStore((state) => state.error);
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [pageData, setPageData] = useState({ page: 1, totalPages: 1, total: 0, limit: 12 });
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const selectedLevel = searchParams.get("level") || "all";
  const selectedCategory = searchParams.get("categoryId") || "all";
  const page = Number(searchParams.get("page") || "1");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await categoryService.getCategories();
        setCategories(response.categories || []);
      } catch {
        toastError("Failed to load categories");
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, [toastError]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses({
          page,
          limit: 12,
          search: searchParams.get("search") || undefined,
          level: selectedLevel !== "all" ? (selectedLevel as CourseLevel) : undefined,
          categoryId: selectedCategory !== "all" ? Number(selectedCategory) : undefined,
          isFree:
            searchParams.get("price") === "free"
              ? true
              : searchParams.get("price") === "paid"
                ? false
                : undefined,
        });

        setCourses(data.courses);
        setPageData(data.pagination);
      } catch (error) {
        toastError(error instanceof Error ? error.message : "Failed to load courses");
        setCourses([]);
        setPageData({ page: 1, totalPages: 1, total: 0, limit: 12 });
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [page, searchParams, selectedCategory, selectedLevel, toastError]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");
    setSearchParams(params);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({ search: searchTerm.trim() || null });
  };

  const levelOptions: { value: string; label: string }[] = [
    { value: "all", label: "All Levels" },
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
  ];

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-2">
            Explore our comprehensive course catalog
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => updateParams({ categoryId: e.target.value })}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {!categoriesLoading && categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => updateParams({ level: e.target.value })}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levelOptions.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {courses.length}
            </span>{" "}
            courses
          </p>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <Skeleton className="h-48 w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 rounded mb-3" />
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-5/6 rounded mb-4" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {pageData.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination currentPage={pageData.page} totalPages={pageData.totalPages} />
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;

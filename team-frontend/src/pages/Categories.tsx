import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../lib/api/axios";
import { LoadingFullPage } from "../components/ui/LoadingFullPage";
import { type Category } from "../types/categories";
import type { ApiResponse } from "../lib/api/types";
import { useToastStore } from "../stores/toastStore";
import { BookOpen, Users } from "lucide-react";

export const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const toastError = useToastStore((state) => state.error);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await Axios.get<ApiResponse<Category[]>>("/api/categories");
        setCategories(res.data.data || []);
      } catch (err: any) {
        toastError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <LoadingFullPage />;
  
  if (!loading && categories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>
        <p className="text-gray-500">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover courses across different categories and find the perfect learning path for you
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/courses?categoryId=${category.id}`}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>

                {/* Category Name */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {category.name}
                </h2>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{category.courseCount} courses</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{Math.floor(Math.random() * 1000) + 100} students</span>
                  </div>
                </div>

                {/* Subcategories */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full text-gray-700 border border-blue-100"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-500">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Hover Arrow */}
                <div className="absolute top-8 right-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Found</h3>
            <p className="text-gray-500">Check back later for new course categories</p>
          </div>
        )}
      </div>
    </div>
  );
};

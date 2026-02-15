import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../lib/api/axios";
import { LoadingFullPage } from "../components/ui/LoadingFullPage";
import { type Category } from "../types/categories";
import type { ApiResponse } from "../lib/api/types";
import { useToastStore } from "../stores/toastStore";

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/courses?categoryId=${category.id}`}
            className="group border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Category Name */}
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
              {category.name}
            </h2>

            {/* Course Count */}
            <p className="text-sm text-gray-500 mb-4">
              {category.courseCount} courses
            </p>

            {/* Subcategories */}
            {category.subcategories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {category.subcategories?.map((sub) => (
                  <span
                    key={sub.id}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

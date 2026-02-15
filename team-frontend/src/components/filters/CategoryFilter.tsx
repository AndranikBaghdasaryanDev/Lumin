import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { categoryService } from "../../lib/api/service/categoryService";
import type { Category } from "../../types/course";
import { Loading } from "../ui/Loading";

interface CategoryFilterProps {
  className?: string;
}

export const CategoryFilter = ({ className }: CategoryFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const selectedCategoryId = searchParams.get("categoryId");
  const selectedSubcategoryId = searchParams.get("subcategoryId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        setCategories(data.categories);
        toast.success("Categories loaded successfully");
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load categories";
        toast.error(`${errorMessage}. Please try again.`);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Auto-expand category when URL changes
  useEffect(() => {
    if (selectedCategoryId && categories.length > 0) {
      const categoryId = parseInt(selectedCategoryId);
      const category = categories.find(cat => cat.id === categoryId);
      if (category && category.subcategories.length > 0) {
        setExpandedCategories(prev => new Set(prev).add(categoryId));
      }
    }
  }, [selectedCategoryId, categories]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategorySelect = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("categoryId", categoryId.toString());
    newParams.delete("subcategoryId");
    setSearchParams(newParams);
    
    if (category) {
      toast.success(`Selected: ${category.name}`);
    }
  };

  const handleSubcategorySelect = (categoryId: number, subcategoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("categoryId", categoryId.toString());
    newParams.set("subcategoryId", subcategoryId.toString());
    setSearchParams(newParams);
    
    if (category && subcategory) {
      toast.success(`Selected: ${category.name} > ${subcategory.name}`);
    }
  };

  const clearSelection = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("categoryId");
    newParams.delete("subcategoryId");
    setSearchParams(newParams);
    toast.success("Filters cleared");
  };

  const isCategorySelected = (categoryId: number) => {
    return selectedCategoryId === categoryId.toString() && !selectedSubcategoryId;
  };

  const isSubcategorySelected = (subcategoryId: number) => {
    return selectedSubcategoryId === subcategoryId.toString();
  };

  if (loading) {
    return <Loading />;
  }

  if (categories.length === 0) {
    return (
      <div className={`text-gray-500 text-center py-4 ${className}`}>
        No categories available
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Categories</h3>
        {(selectedCategoryId || selectedSubcategoryId) && (
          <button
            onClick={clearSelection}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          const isSelected = isCategorySelected(category.id);
          const hasSelectedSubcategory = category.subcategories.some(sub => 
            isSubcategorySelected(sub.id)
          );

          return (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                  isSelected 
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" 
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center justify-between flex-1">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-gray-500">
                    {category.courseCount} courses
                  </span>
                </div>
              </button>

              {category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full px-4 py-2 flex items-center justify-between text-sm transition-colors ${
                    isSelected || hasSelectedSubcategory
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    Subcategories ({category.subcategories.length})
                  </span>
                </button>
              )}

              {isExpanded && category.subcategories.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-200">
                  {category.subcategories.map((subcategory) => {
                    const isSubSelected = isSubcategorySelected(subcategory.id);
                    
                    return (
                      <button
                        key={subcategory.id}
                        onClick={() => handleSubcategorySelect(category.id, subcategory.id)}
                        className={`w-full px-6 py-2 text-left flex items-center justify-between transition-colors ${
                          isSubSelected
                            ? "bg-blue-100 text-blue-700 border-l-2 border-blue-500"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        <span className="text-sm">{subcategory.name}</span>
                        <span className="text-xs text-gray-500">
                          {subcategory.courseCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

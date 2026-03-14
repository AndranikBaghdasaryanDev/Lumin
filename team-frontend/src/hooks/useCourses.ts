import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCoursesStore } from '../stores/coursesStore';
import { type CourseFilters } from '../lib/api/service/courseService';
import { useToastStore } from '../stores/toastStore';

export const useCourses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { error: showError } = useToastStore();
  
  const {
    coursesData,
    loading,
    error,
    fetchCourses: storeFetchCourses
  } = useCoursesStore();

  // Get filters from URL
  const getFiltersFromUrl = (): CourseFilters => {
    const categoryId = searchParams.get('categoryId');
    const level = searchParams.get('level');
    const isFree = searchParams.get('isFree');
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    return {
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      level: level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | undefined,
      isFree: isFree !== null ? isFree === 'true' : undefined,
      page: page ? parseInt(page, 10) : 1,
      limit: 12,
      search: search || undefined,
      sort: sort as "newest" | "price_low" | "price_high" | undefined
    };
  };

  // Update URL with filters
  const updateFilters = (newFilters: Partial<CourseFilters>) => {
    const currentFilters = getFiltersFromUrl();
    const updatedFilters = { ...currentFilters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
    
    const params = new URLSearchParams();
    
    if (updatedFilters.categoryId) params.append('categoryId', updatedFilters.categoryId.toString());
    if (updatedFilters.level) params.append('level', updatedFilters.level);
    if (updatedFilters.isFree !== undefined) params.append('isFree', updatedFilters.isFree.toString());
    if (updatedFilters.page && updatedFilters.page > 1) params.append('page', updatedFilters.page.toString());
    if (updatedFilters.search) params.append('search', updatedFilters.search);
    if (updatedFilters.sort) params.append('sort', updatedFilters.sort);
    
    setSearchParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Get active filters count
  const getActiveFiltersCount = (): number => {
    const filters = getFiltersFromUrl();
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.level) count++;
    if (filters.isFree !== undefined) count++;
    if (filters.search) count++;
    if (filters.sort) count++;
    return count;
  };

  // Fetch courses when component mounts or when URL filters change
  useEffect(() => {
    console.log("🎯 useCourses effect triggered - loading:", loading);
    const filters = getFiltersFromUrl();
    console.log("🔄 Triggering store fetchCourses with filters:", filters);
    storeFetchCourses(filters);
  }, [searchParams]); // Depend on searchParams to refetch when URL changes
  
  // Show toast error when error occurs
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  return {
    coursesData,
    loading,
    error,
    filters: getFiltersFromUrl(),
    updateFilters,
    clearFilters,
    getActiveFiltersCount,
    refetch: () => storeFetchCourses(getFiltersFromUrl())
  };
};

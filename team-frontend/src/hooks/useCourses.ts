import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseService, type CourseFilters } from '../lib/api/service/courseService';
import type { CoursesData } from '../types/course';

export const useCourses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [coursesData, setCoursesData] = useState<CoursesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get filters from URL
  const getFiltersFromUrl = (): CourseFilters => {
    const categoryId = searchParams.get('categoryId');
    const level = searchParams.get('level');
    const isFree = searchParams.get('isFree');
    const page = searchParams.get('page');

    return {
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      level: level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | undefined,
      isFree: isFree !== null ? isFree === 'true' : undefined,
      page: page ? parseInt(page, 10) : 1,
      limit: 12
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
    return count;
  };

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = getFiltersFromUrl();
      console.log("Fetching courses with filters:", filters);
      
      const response = await courseService.getCourses(filters);
      console.log("Courses API response:", response);
      
      if (response.success && response.data) {
        setCoursesData(response.data);
      } else {
        const errorMessage = response.error?.message || 'Failed to fetch courses';
        console.error("Courses API error:", response.error);
        setError(errorMessage);
        setCoursesData(null);
      }
    } catch (err: any) {
      console.error("Courses fetch error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 500) {
        setError('Server error: Please try again later');
      } else if (err.response?.status === 401) {
        setError('Authentication error: Please login again');
      } else {
        setError('Failed to fetch courses: ' + (err.message || 'Unknown error'));
      }
      setCoursesData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses when filters change
  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  return {
    coursesData,
    loading,
    error,
    filters: getFiltersFromUrl(),
    updateFilters,
    clearFilters,
    getActiveFiltersCount,
    refetch: fetchCourses
  };
};

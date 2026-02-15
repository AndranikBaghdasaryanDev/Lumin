import { Axios } from '../axios';
import type { CourseListItem, CoursesData } from '../../../types/course';
import type { CourseDetails, CourseDetailsResponse } from '../../../types/course.types';

export interface CourseFilters {
  page?: number;
  limit?: number;
  category?: string;
  level?: string;
  search?: string;
}

export const courseService = {
  /**
   * Fetch courses with pagination and filters
   */
  async getCourses(filters: CourseFilters = {}): Promise<CoursesData> {
    const params = new URLSearchParams();
    
    // Add query parameters
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.category) params.append('category', filters.category);
    if (filters.level) params.append('level', filters.level);
    if (filters.search) params.append('search', filters.search);

    const response = await Axios.get(`/courses?${params.toString()}`);
    return response.data;
  },

  /**
   * Get a single course by ID
   */
  async getCourseById(id: string | number): Promise<CourseDetailsResponse> {
    const response = await Axios.get(`/courses/${id}`);
    return response.data;
  },

  /**
   * Get course categories
   */
  async getCategories(): Promise<string[]> {
    const response = await Axios.get('/courses/categories');
    return response.data;
  }
};

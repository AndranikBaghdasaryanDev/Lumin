<<<<<<< HEAD
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
=======
import { Axios } from "../axios";
import type { CoursesData, CourseListItem } from "../../../types/course";
import type { ApiResponse } from "../types";

export interface CourseFilters {
  categoryId?: number;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isFree?: boolean;
  page?: number;
  limit?: number;
}

export const courseService = {
  getCourses: async (filters: CourseFilters = {}): Promise<ApiResponse<CoursesData>> => {
    const params = new URLSearchParams();
    
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.level) params.append('level', filters.level);
    if (filters.isFree !== undefined) params.append('isFree', filters.isFree.toString());
    params.append('page', (filters.page || 1).toString());
    params.append('limit', (filters.limit || 12).toString());
    
    return Axios.get(`/courses?${params.toString()}`);
  },

  getCourseById: async (id: number): Promise<ApiResponse<CourseListItem>> => {
    return Axios.get(`/courses/${id}`);
>>>>>>> 6051ac97e00439584f1eee7d84ddf552f0cf4e89
  }
};

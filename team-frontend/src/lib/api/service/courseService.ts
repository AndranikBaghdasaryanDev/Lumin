import { Axios } from "../axios";
import type { CourseListItem } from "../../../types/course";
import type { ApiResponse } from "../types";

export interface CourseFilters {
  categoryId?: number;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isFree?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sort?: "newest" | "price_low" | "price_high";
}

export const courseService = {
  getCourses: async (filters: CourseFilters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.level) params.append('level', filters.level);
    if (filters.isFree !== undefined) params.append('isFree', filters.isFree.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    params.append('page', (filters.page || 1).toString());
    params.append('limit', (filters.limit || 12).toString());
    
    return Axios.get(`/api/courses?${params.toString()}`);
  },

  getCourseById: async (id: string | number): Promise<ApiResponse<CourseListItem>> => {
    const response = await Axios.get(`/api/courses/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await Axios.get('/api/courses/categories');
    return response.data;
  },

  getRelatedCourses: async (id: string | number): Promise<ApiResponse<CourseListItem[]>> => {
    const response = await Axios.get(`/api/courses/${id}/related`);
    return response.data;
  }
};

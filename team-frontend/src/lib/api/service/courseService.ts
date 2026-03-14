import { Axios } from "../axios";
import type { CourseListItem, CoursesData } from "../../../types/course";
import type { CourseDetailsResponse } from "../../../types/course.types";
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
    
    return Axios.get(`/api/courses?${params.toString()}`);
  },

  getCourseById: async (id: string | number): Promise<CourseDetailsResponse> => {
    const response = await Axios.get(`/api/courses/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await Axios.get('/api/courses/categories');
    return response.data;
  },

  getRelatedCourses: async (id: string): Promise<CourseListItem[]> => {
    const response = await Axios.get<ApiResponse<CourseListItem[]>>(`/api/courses/${id}/related`);
    return response.data.data ?? [];
  }
};

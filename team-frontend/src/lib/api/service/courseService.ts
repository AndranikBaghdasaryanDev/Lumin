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
  }
};

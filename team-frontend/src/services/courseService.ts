import { Axios } from "../lib/api/axios";
import type { ApiResponse } from "../lib/api/types";
import type { CourseListItem, CoursesData, CoursesFilters } from "../types/course";

const buildCourseQuery = (filters: CoursesFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.page) {
    params.set("page", filters.page.toString());
  }

  if (filters.limit) {
    params.set("limit", filters.limit.toString());
  }

  if (filters.categoryId) {
    params.set("categoryId", filters.categoryId.toString());
  }

  if (filters.level) {
    params.set("level", filters.level);
  }

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  if (filters.isFree !== undefined) {
    params.set("isFree", String(filters.isFree));
  }

  return params;
};

const unwrapResponse = <T>(response: ApiResponse<T>, fallbackMessage: string): T => {
  if (!response.success || response.data === undefined) {
    throw new Error(response.error?.message || fallbackMessage);
  }

  return response.data;
};

export const fetchCourses = async (filters: CoursesFilters = {}): Promise<CoursesData> => {
  const params = buildCourseQuery(filters);
  const response = await Axios.get<ApiResponse<CoursesData>>(`/api/courses?${params.toString()}`);

  return unwrapResponse(response.data, "Failed to fetch courses");
};

export const fetchCourseById = async (id: string | number): Promise<CourseListItem> => {
  const response = await Axios.get<ApiResponse<CourseListItem>>(`/api/courses/${id}`);

  return unwrapResponse(response.data, "Failed to fetch course details");
};

export const fetchRelatedCourses = async (id: string | number): Promise<CourseListItem[]> => {
  const response = await Axios.get<ApiResponse<CourseListItem[]>>(`/api/courses/${id}/related`);

  return unwrapResponse(response.data, "Failed to fetch related courses");
};

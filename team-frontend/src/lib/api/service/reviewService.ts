import { Axios } from "../axios";
import type { ReviewResponse, ReviewFilters } from "../../../types/review.types";

export const reviewService = {
  getCourseReviews: async (courseId: string | number, filters: ReviewFilters = {}): Promise<ReviewResponse> => {
    const params = new URLSearchParams();
    
    if (filters.rating) params.append('rating', filters.rating.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    params.append('page', (filters.page || 1).toString());
    params.append('limit', (filters.limit || 10).toString());
    
    const response = await Axios.get(`/courses/${courseId}/reviews?${params.toString()}`);
    return response.data;
  },

  getReviewSummary: async (courseId: string | number): Promise<ReviewResponse['summary']> => {
    const response = await Axios.get(`/courses/${courseId}/reviews/summary`);
    return response.data;
  }
};

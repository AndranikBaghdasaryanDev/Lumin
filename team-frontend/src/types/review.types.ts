import type { CourseDetails, Review } from './course.types';

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
}

export interface ReviewFilters {
  rating?: number;
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest';
  page?: number;
  limit?: number;
}

export interface ReviewResponse {
  reviews: Review[];
  summary: ReviewSummary;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RatingSummaryProps {
  summary: ReviewSummary | null;
  isLoading?: boolean;
}

export interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

export interface ReviewSectionProps {
  course: CourseDetails;
}

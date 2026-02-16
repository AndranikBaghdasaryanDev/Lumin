import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ProtectedRoute } from '../../ProtectedRoute';

// Components
import { RatingSummary } from './RatingSummary';
import { ReviewList } from './ReviewList';

// Services
import { reviewService } from '../../../lib/api/service/reviewService';

// Types
import type { ReviewSectionProps, ReviewSummary } from '../../../types/review.types';


export const ReviewSection: React.FC<ReviewSectionProps> = ({ course }) => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviewSummary = async () => {
      try {
        setIsLoading(true);
        const summaryData = await reviewService.getReviewSummary(course.id);
        setSummary(summaryData);
      } catch (error) {
        console.error('Failed to fetch review summary:', error);
        toast.error('Failed to load reviews');
        
        // Fallback to course data for Sprint 2
        setSummary({
          averageRating: course.rating,
          totalReviews: course.ratingCount,
          ratingDistribution: [
            { rating: 5, count: 0, percentage: 0 },
            { rating: 4, count: 0, percentage: 0 },
            { rating: 3, count: 0, percentage: 0 },
            { rating: 2, count: 0, percentage: 0 },
            { rating: 1, count: 0, percentage: 0 },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewSummary();
  }, [course.id, course.rating, course.ratingCount]);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Student Reviews</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <RatingSummary summary={summary} isLoading={isLoading} />
          </div>
          
          {/* Review List */}
          <div className="lg:col-span-2">
            <ReviewList reviews={course.reviews} isLoading={isLoading} />
          </div>
        </div>

        {/* Submit Review Area - Ready for Sprint 3 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <ProtectedRoute>
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">Review submission coming soon!</p>
              <p className="text-sm text-gray-500">
                This feature will be available in the next sprint.
              </p>
            </div>
          </ProtectedRoute>
        </div>
      </div>
    </div>
  );
};

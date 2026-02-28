import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import type { CourseDetails } from '../../types/course.types';

interface CourseReviewsProps {
  course: CourseDetails;
}

export const CourseReviews: React.FC<CourseReviewsProps> = ({ course }) => {
  const hasReviews = course.reviews && course.reviews.length > 0;
  const hasRating = course.rating > 0 && course.ratingCount > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
        
        {hasRating && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(course.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {course.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({course.ratingCount.toLocaleString()} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Sprint 2 - Empty State */}
      {!hasReviews && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <MessageSquare className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-500 mb-6">
            Be the first to share your experience with this course
          </p>
          
          {/* Placeholder for future "Write a Review" button */}
          <div className="text-sm text-gray-400">
            Reviews will be available in Sprint 3
          </div>
        </div>
      )}

      {/* Sprint 2 - Reviews List (Empty State Structure) */}
      {hasReviews && (
        <div className="space-y-6">
          {/* Rating Summary Section - Prepared for Sprint 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Summary</h3>
            
            {/* Placeholder for rating breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-12">{rating} stars</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: '0%' }} // Will be calculated in Sprint 3
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-12 text-right">0%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List - Prepared for Sprint 3 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Student Reviews</h3>
            
            {/* Placeholder review items */}
            <div className="space-y-4">
              {course.reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {/* Avatar placeholder */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-medium">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">{review.userName}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed ml-13">
                    {review.comment}
                  </p>
                  
                  {/* Helpful buttons - Prepared for Sprint 3 */}
                  <div className="flex items-center space-x-4 mt-3 ml-13">
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Helpful ({review.helpfulCount})
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load more reviews button - Prepared for Sprint 3 */}
            {course.reviews.length > 3 && (
              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                  Load more reviews ({course.reviews.length - 3} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseReviews;

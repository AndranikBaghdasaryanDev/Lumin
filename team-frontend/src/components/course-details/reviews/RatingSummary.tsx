import React from 'react';
import { Star } from 'lucide-react';
import type { RatingSummaryProps } from '../../../types/review.types';



export const RatingSummary: React.FC<RatingSummaryProps> = ({ summary, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="flex-1 h-2 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!summary || summary.totalReviews === 0) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-8 h-8 text-gray-300"
              fill="currentColor"
            />
          ))}
        </div>
        <div className="text-3xl font-bold text-gray-400 mb-2">0.0</div>
        <p className="text-gray-500">No ratings yet</p>
        <p className="text-sm text-gray-400 mt-1">Be the first to rate this course</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {summary.averageRating.toFixed(1)}
        </div>
        <div className="flex items-center justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < Math.floor(summary.averageRating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill="currentColor"
            />
          ))}
        </div>
        <p className="text-gray-600">{summary.totalReviews} ratings</p>
      </div>

      <div className="space-y-2">
        {summary.ratingDistribution.map((distribution) => (
          <div key={distribution.rating} className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 w-12">
              <span className="text-sm text-gray-600">{distribution.rating}</span>
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-300"
                style={{ width: `${distribution.percentage}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 w-8 text-right">
              {distribution.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

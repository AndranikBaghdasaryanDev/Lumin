import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, User, BookOpen } from 'lucide-react';
import type { CourseListItem } from '../../types/course';

interface CourseCardProps {
  course: CourseListItem;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className = '' }) => {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasDiscount = course.discountPrice > 0 && course.discountPrice < course.price;
  const showRating = course.rating > 0 && course.ratingCount > 0;

  return (
    <Link
      to={`/courses/${course.id}`}
      className={`group block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden ${className}`}
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={course.thumbnail || '/api/placeholder/400/225'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/placeholder/400/225';
          }}
        />
        
        {course.isFree && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Free
          </div>
        )}
        
        {hasDiscount && !course.isFree && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Sale
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <User className="w-4 h-4 mr-1" />
          <span className="truncate">{course.instructor?.name || 'Instructor'}</span>
        </div>

        {/* Rating */}
        {showRating && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <div className="flex items-center mr-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium text-gray-900">{course.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500">({course.ratingCount.toLocaleString()})</span>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span className="capitalize">{course.level.toLowerCase()}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          {course.isFree ? (
            <span className="text-lg font-bold text-green-600">Free</span>
          ) : (
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(course.discountPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(course.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(course.price)}
                </span>
              )}
            </div>
          )}
          
          {course.enrollmentCount > 0 && (
            <span className="text-xs text-gray-500">
              {course.enrollmentCount.toLocaleString()} enrolled
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

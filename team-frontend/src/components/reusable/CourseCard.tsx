import React from "react";
import { useNavigate } from "react-router-dom";

import { type CourseListItem } from "../../types/course";

interface CourseCardProps {
  course: CourseListItem;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h > 0 ? h + "h " : ""}${m}m`;
  };

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {course.isFree && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
            FREE
          </span>
        )}
        {course.discountPrice < course.price && (
          <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
            -{Math.round(((course.price - course.discountPrice) / course.price) * 100)}%
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{course.instructor.name.charAt(0).toUpperCase()}</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">{course.instructor.name}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {course.ratingCount > 0 ? (
              <>
                <span className="font-semibold text-gray-900">{course.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-600">({course.ratingCount})</span>
              </>
            ) : (
              <span className="text-xs text-gray-600">New</span>
            )}
          </div>
        </div>

        {/* Price and Duration Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {course.isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : course.discountPrice < course.price ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">${course.discountPrice}</span>
                <span className="text-sm text-gray-400 line-through">${course.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">${course.price}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
              {course.level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

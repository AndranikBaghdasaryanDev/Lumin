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
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        {course.isFree && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Free
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600">{course.instructor.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {course.ratingCount > 0 ? (
            <>
              <span>⭐ {course.rating.toFixed(1)}</span>
              <span className="text-gray-400">({course.ratingCount})</span>
            </>
          ) : (
            <span className="text-gray-400">No ratings yet</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          {course.isFree ? (
            <span>Free</span>
          ) : course.discountPrice < course.price ? (
            <>
              <span className="line-through text-gray-400">${course.price}</span>
              <span className="text-green-600">${course.discountPrice}</span>
            </>
          ) : (
            <span>${course.price}</span>
          )}
        </div>

        {/* Duration and Level */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
          <span>{course.level}</span>
          <span>{formatDuration(course.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

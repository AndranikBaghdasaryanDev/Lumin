import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";
import type { CourseListItem } from "../types/course";

interface CourseCardProps {
  course: CourseListItem;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  };

  const displayPrice = course.isFree
    ? "Free"
    : `$${course.discountPrice > 0 && course.discountPrice < course.price ? course.discountPrice : course.price}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
          {course.level}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{course.shortDescription || course.description}</p>
        </div>

        {/* Course Meta */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.enrollmentCount}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Instructor and Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Instructor</p>
            <p className="text-sm font-medium text-gray-700">{course.instructor.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{displayPrice}</p>
            {!course.isFree && course.discountPrice > 0 && course.discountPrice < course.price && (
              <p className="text-xs text-gray-500 line-through">
                ${course.price}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/courses/${course.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

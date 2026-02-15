import React from 'react';
import toast from 'react-hot-toast';
import type { CourseDetails } from '../../types/course.types';

interface PriceCardProps {
  course: CourseDetails;
}

export const PriceCard: React.FC<PriceCardProps> = ({ course }) => {
  const handleEnrollClick = () => {
    toast('Enrollment feature coming soon!', { icon: '🚧' });
  };

  return (
    <div className="bg-white rounded-lg p-6 sticky top-8 space-y-6">
      {/* Instructor Info */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-medium text-lg">
            {course.instructor.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{course.instructor.name}</h3>
          <p className="text-sm text-gray-600">{course.instructor.expertise.join(', ')}</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-center">
        {course.isFree ? (
          <div className="text-3xl font-bold text-green-600">Free</div>
        ) : course.discountPrice < course.price ? (
          <div>
            <div className="text-3xl font-bold text-gray-900">${course.discountPrice}</div>
            <div className="text-lg text-gray-500 line-through">${course.price}</div>
          </div>
        ) : (
          <div className="text-3xl font-bold text-gray-900">${course.price}</div>
        )}
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnrollClick}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
      </button>

      {/* Course Info */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Duration</span>
          <span className="font-medium">{Math.floor(course.duration / 3600)}h {Math.floor((course.duration % 3600) / 60)}m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Lessons</span>
          <span className="font-medium">{course.totalLessons}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Level</span>
          <span className="font-medium">{course.level}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Certificate</span>
          <span className="font-medium">{course.certificate ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* Enrollment Count */}
      <div className="text-center text-sm text-gray-600">
        {course.enrollmentCount === 0 ? (
          <span>Be the first to enroll</span>
        ) : (
          <span>{course.enrollmentCount} students enrolled</span>
        )}
      </div>
    </div>
  );
};

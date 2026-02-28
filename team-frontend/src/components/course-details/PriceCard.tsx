import React from 'react';
import toast from 'react-hot-toast';
import type { CourseDetails } from '../../types/course.types';
import { Button } from '../ui';

interface PriceCardProps {
  course: CourseDetails;
}

export const PriceCard: React.FC<PriceCardProps> = ({ course }) => {
  const handleEnrollClick = () => {
    toast('Enrollment feature coming soon!', { icon: '🚧' });
  };

  return (
    <div className="bg-white rounded-2xl p-8 sticky top-8 space-y-8 shadow-lg border border-gray-100/60">
      {/* Instructor Info */}
      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">
            {course.instructor.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{course.instructor.name}</h3>
          <p className="text-sm text-gray-600 font-medium">{course.instructor.expertise.join(', ')}</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50/20 rounded-xl border border-gray-200/50">
        {course.isFree ? (
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Free</div>
            <div className="text-sm text-gray-600">Full access to all content</div>
          </div>
        ) : course.discountPrice < course.price ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl font-bold text-gray-900">${course.discountPrice}</div>
              <div className="text-xl text-gray-400 line-through">${course.price}</div>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Save ${course.price - course.discountPrice}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl font-bold text-gray-900">${course.price}</div>
            <div className="text-sm text-gray-600">One-time payment</div>
          </div>
        )}
      </div>

      {/* Enroll Button */}
      <Button
        onClick={handleEnrollClick}
        size="lg"
        className="w-full text-lg py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
      </Button>

      {/* Course Info */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Course Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Duration</span>
            </div>
            <span className="font-semibold text-gray-900">{Math.floor(course.duration / 3600)}h {Math.floor((course.duration % 3600) / 60)}m</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-medium">Lessons</span>
            </div>
            <span className="font-semibold text-gray-900">{course.totalLessons}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">Level</span>
            </div>
            <span className="font-semibold text-gray-900">{course.level}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="font-medium">Certificate</span>
            </div>
            <span className={`font-semibold ${course.certificate ? 'text-green-600' : 'text-gray-400'}`}>
              {course.certificate ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Enrollment Count */}
      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="font-medium">
            {course.enrollmentCount === 0 ? (
              'Be the first to enroll'
            ) : (
              `${course.enrollmentCount} students enrolled`
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { CourseDetails } from '../../types/course.types';

interface CourseHeroProps {
  course: CourseDetails;
}

export const CourseHero: React.FC<CourseHeroProps> = ({ course }) => (
  <div className="bg-white rounded-lg overflow-hidden">
    <div className="relative h-64 bg-gray-200">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      {course.isFree && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Free Course
        </div>
      )}
    </div>
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{course.rating.toFixed(1)} ({course.ratingCount === 0 ? 'No reviews yet' : `${course.ratingCount} ratings`})</span>
        </div>
        <div>•</div>
        <div>{course.enrollmentCount === 0 ? 'Be the first to enroll' : `${course.enrollmentCount} students`}</div>
        <div>•</div>
        <div>{Math.floor(course.duration / 3600)}h {Math.floor((course.duration % 3600) / 60)}m</div>
        <div>•</div>
        <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {course.level}
        </div>
      </div>
    </div>
  </div>
);

import React from 'react';
import type { CourseDetails } from '../../types/course.types';

interface CourseHeroProps {
  course: CourseDetails;
}

export const CourseHero: React.FC<CourseHeroProps> = ({ course }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100/60">
    <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      {course.isFree && (
        <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Free Course
        </div>
      )}
    </div>
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{course.title}</h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{course.description}</p>
      
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-semibold text-gray-900">{course.rating.toFixed(1)}</span>
          <span className="text-gray-600">({course.ratingCount === 0 ? 'No reviews' : `${course.ratingCount} ratings`})</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>{course.enrollmentCount === 0 ? 'Be the first to enroll' : `${course.enrollmentCount} students`}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{Math.floor(course.duration / 3600)}h {Math.floor((course.duration % 3600) / 60)}m</span>
        </div>
        
        <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg font-medium border border-blue-200/50">
          {course.level}
        </div>
      </div>
    </div>
  </div>
);

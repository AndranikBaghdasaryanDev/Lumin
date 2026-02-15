import React from 'react';
import type { CourseDetails } from '../../types/course.types';

interface OverviewTabProps {
  course: CourseDetails;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ course }) => (
  <div className="p-6 space-y-8">
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">About this course</h3>
      <p className="text-gray-600 leading-relaxed">{course.fullDescription}</p>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {course.whatYouWillLearn.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
      <ul className="space-y-2">
        {course.requirements.map((req, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
            </div>
            <span className="text-gray-700">{req}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Target audience</h3>
      <ul className="space-y-2">
        {course.targetAudience.map((audience, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <span className="text-gray-700">{audience}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

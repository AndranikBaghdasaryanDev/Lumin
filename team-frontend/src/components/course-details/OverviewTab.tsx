import React from 'react';
import type { CourseDetails } from '../../types/course.types';

interface OverviewTabProps {
  course: CourseDetails;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ course }) => (
  <div className="p-8 space-y-10">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-2xl p-8 border border-blue-100/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        About this course
      </h3>
      <p className="text-gray-700 leading-relaxed text-lg">{course.fullDescription}</p>
    </div>

    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/60">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        What you'll learn
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {course.whatYouWillLearn.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-xl border border-green-100/50 hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/60">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        Requirements
      </h3>
      <ul className="space-y-4">
        {course.requirements.map((req, index) => (
          <li key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50/30 rounded-xl border border-blue-100/50 hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
            <span className="text-gray-800 font-medium leading-relaxed">{req}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-gradient-to-br from-purple-50 to-pink-50/30 rounded-2xl p-8 border border-purple-100/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        Target audience
      </h3>
      <ul className="space-y-4">
        {course.targetAudience.map((audience, index) => (
          <li key={index} className="flex items-start space-x-4 p-4 bg-white/70 rounded-xl border border-purple-100/50 hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mt-2 shadow-lg"></div>
            <span className="text-gray-800 font-medium leading-relaxed">{audience}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

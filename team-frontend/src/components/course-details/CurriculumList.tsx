import React from 'react';
import type { CourseDetails } from '../../types/course.types';

interface CurriculumListProps {
  course: CourseDetails;
}

export const CurriculumList: React.FC<CurriculumListProps> = ({ course }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-gray-900">Course Content</h3>
      <div className="text-sm text-gray-500">
        {course.totalModules} modules • {course.totalLessons} lessons • {Math.floor(course.duration / 3600)}h {Math.floor((course.duration % 3600) / 60)}m total length
      </div>
    </div>

    <div className="space-y-4">
      {course.modules.map((module, moduleIndex) => (
        <div key={module.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">
              Module {moduleIndex + 1}: {module.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
          </div>
          <div className="divide-y divide-gray-200">
            {module.lessons.map((lesson) => (
              <div key={lesson.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {lesson.isPreview ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {lesson.isPreview && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Preview</span>
                    )}
                    <span>{Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

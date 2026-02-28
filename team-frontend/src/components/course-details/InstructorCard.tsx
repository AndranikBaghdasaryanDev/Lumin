import React from 'react';
import { Card, CardContent } from '../ui/Card';
import type { InstructorCardProps } from '../../types/instructor';


export function InstructorCard({ instructor }: InstructorCardProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLDivElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <Card variant="elevated" className="w-full overflow-hidden">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">About the Instructor</h3>
        <p className="text-blue-100 text-sm">Learn from industry experts</p>
      </div>
      
      <CardContent padding="lg">
        <div className="flex flex-col items-center text-center gap-6 -mt-12">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              {instructor.profileImage ? (
                <>
                  <img
                    src={instructor.profileImage}
                    alt={getFullName(instructor.firstName, instructor.lastName)}
                    className="w-full h-full rounded-full object-cover"
                    onError={handleImageError}
                  />
                  <div
                    className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
                    style={{ display: 'none' }}
                  >
                    {getInitials(instructor.firstName, instructor.lastName)}
                  </div>
                </>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(instructor.firstName, instructor.lastName)}
                </div>
              )}
            </div>
          </div>

          {/* Instructor Info */}
          <div className="space-y-4 w-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {getFullName(instructor.firstName, instructor.lastName)}
              </h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {instructor.bio || 'Passionate educator dedicated to helping students achieve their learning goals.'}
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200/50">
                Industry Expert
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-medium border border-green-200/50">
                Professional Educator
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {/* Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-gray-900 text-lg">
                    {instructor.instructorRating?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Rating</p>
              </div>

              {/* Courses Count */}
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {instructor.coursesCount || '--'}
                </div>
                <p className="text-xs text-gray-500 font-medium">Courses</p>
              </div>

              {/* Students Count */}
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {instructor.studentsCount ? 
                    instructor.studentsCount.toLocaleString() : '--'
                  }
                </div>
                <p className="text-xs text-gray-500 font-medium">Students</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


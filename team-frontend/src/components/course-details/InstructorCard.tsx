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
    <Card variant="elevated" className="w-full">
      <CardContent padding="lg">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              {instructor.profileImage ? (
                <>
                  <img
                    src={instructor.profileImage}
                    alt={getFullName(instructor.firstName, instructor.lastName)}
                    className="w-full h-full rounded-full object-cover border-4 border-gray-100"
                    onError={handleImageError}
                  />
                  <div
                    className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold"
                    style={{ display: 'none' }}
                  >
                    {getInitials(instructor.firstName, instructor.lastName)}
                  </div>
                </>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  {getInitials(instructor.firstName, instructor.lastName)}
                </div>
              )}
            </div>
          </div>

          {/* Instructor Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {getFullName(instructor.firstName, instructor.lastName)}
              </h2>
              <p className="text-gray-600 mt-1 leading-relaxed">
                {instructor.bio || 'No bio available'}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {/* Rating */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
                  <span className="text-lg">⭐</span>
                  <span className="font-semibold text-gray-900">
                    {instructor.instructorRating?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Instructor Rating</p>
              </div>

              {/* Courses Count */}
              <div className="text-center sm:text-left">
                <div className="text-xl font-bold text-gray-900">
                  {instructor.coursesCount || '--'}
                </div>
                <p className="text-sm text-gray-500 mt-1">Courses</p>
              </div>

              {/* Students Count */}
              <div className="text-center sm:text-left">
                <div className="text-xl font-bold text-gray-900">
                  {instructor.studentsCount ? 
                    instructor.studentsCount.toLocaleString() : '--'
                  }
                </div>
                <p className="text-sm text-gray-500 mt-1">Students</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


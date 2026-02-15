import React from 'react';

export const CourseHeroSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg overflow-hidden">
    <div className="h-64 bg-gray-200 animate-pulse"></div>
    <div className="p-6 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

export const CourseTabsSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg">
    <div className="flex space-x-8 border-b border-gray-200 p-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
      ))}
    </div>
    <div className="p-6 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  </div>
);

export const PriceCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg p-6 sticky top-8 space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-3 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  </div>
);

export const CourseDetailsSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CourseHeroSkeleton />
          <CourseTabsSkeleton />
        </div>
        <div className="lg:col-span-1">
          <PriceCardSkeleton />
        </div>
      </div>
    </div>
  </div>
);

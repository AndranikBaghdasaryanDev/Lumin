import React from 'react';

interface CourseTabsProps {
  activeTab: 'overview' | 'curriculum' | 'reviews';
  onTabChange: (tab: 'overview' | 'curriculum' | 'reviews') => void;
}

export const CourseTabs: React.FC<CourseTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden">
    <div className="flex">
      {[
        { id: 'overview', label: 'Overview', icon: '📋' },
        { id: 'curriculum', label: 'Curriculum', icon: '📚' },
        { id: 'reviews', label: 'Reviews', icon: '⭐' }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all duration-200 relative ${
            activeTab === tab.id
              ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="font-semibold">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          )}
        </button>
      ))}
    </div>
  </div>
);

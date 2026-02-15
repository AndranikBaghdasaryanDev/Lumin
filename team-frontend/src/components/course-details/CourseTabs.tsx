import React from 'react';

interface CourseTabsProps {
  activeTab: 'overview' | 'curriculum' | 'reviews';
  onTabChange: (tab: 'overview' | 'curriculum' | 'reviews') => void;
}

export const CourseTabs: React.FC<CourseTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="bg-white rounded-lg">
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'curriculum', label: 'Curriculum' },
          { id: 'reviews', label: 'Reviews' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  </div>
);

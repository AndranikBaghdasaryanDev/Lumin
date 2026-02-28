import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CourseCard } from './CourseCard';
import { useToastStore } from '../../stores/toastStore';
import { Axios } from '../../lib/api/axios';
import type { CourseListItem } from '../../types/course';

interface RelatedCoursesProps {
  courseId: string;
  className?: string;
}

export const RelatedCourses: React.FC<RelatedCoursesProps> = ({ 
  courseId, 
  className = '' 
}) => {
  const [relatedCourses, setRelatedCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { error } = useToastStore();

  const coursesToShow = 4;
  const maxIndex = Math.max(0, relatedCourses.length - coursesToShow);

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        setLoading(true);
        const response = await Axios.get<{ courses: CourseListItem[] }>(
          `/api/courses/${courseId}/related`
        );
        setRelatedCourses(response.data.courses || []);
      } catch (err) {
        error('Failed to load related courses');
        setRelatedCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchRelatedCourses();
    }
  }, [courseId, error]);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleCourses = relatedCourses.slice(
    currentIndex, 
    currentIndex + coursesToShow
  );

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Related Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedCourses.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Related Courses</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No related courses found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Related Courses</h2>
        
        {/* Navigation Buttons - Only show if we have more courses than can be displayed */}
        {relatedCourses.length > coursesToShow && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous courses"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <span className="text-sm text-gray-500 min-w-[3rem] text-center">
              {currentIndex + 1}-{Math.min(currentIndex + coursesToShow, relatedCourses.length)} of {relatedCourses.length}
            </span>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next courses"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div className="relative">
        {/* Mobile Scroll Container */}
        <div className="lg:hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
              {relatedCourses.map((course) => (
                <div key={course.id} className="w-80 flex-shrink-0">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* View All Button */}
      {relatedCourses.length > coursesToShow && (
        <div className="mt-6 text-center">
          <button
            onClick={() => window.open('/courses', '_blank')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            View all related courses
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedCourses;

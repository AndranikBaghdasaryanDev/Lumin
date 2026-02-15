import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Services
import { courseService } from '../lib/api/service/courseService';

// Types
import type { CourseDetailsResponse } from '../types/course.types';

// Components - Organized imports
import {
  CourseHero,
  CourseTabs,
  OverviewTab,
  CurriculumList,
  ReviewSection,
  PriceCard,
  CourseDetailsSkeleton
} from '../components/course-details';

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('Course ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await courseService.getCourseById(id);
        setCourseData(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch course details';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const course = courseData.course;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Hero */}
            <CourseHero course={course} />

            {/* Tabs */}
            <div className="space-y-6">
              <CourseTabs 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
              
              <div className="bg-white rounded-lg">
                {activeTab === 'overview' && <OverviewTab course={course} />}
                {activeTab === 'curriculum' && <CurriculumList course={course} />}
                {activeTab === 'reviews' && <ReviewSection course={course} />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PriceCard course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;

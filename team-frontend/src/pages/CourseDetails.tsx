import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Award,
  User,
  ArrowLeft,
} from "lucide-react";
import CourseCard from "../components/CourseCard";
import { LoadingFullPage } from "../components/ui/LoadingFullPage";
import { useToastStore } from "../stores/toastStore";
import { fetchCourseById, fetchRelatedCourses } from "../services/courseService";
import type { CourseListItem } from "../types/course";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const toastError = useToastStore((state) => state.error);
  const [course, setCourse] = useState<CourseListItem | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourseData = async () => {
      if (!id) {
        const message = "Course ID is required";
        setLoadError(message);
        setLoading(false);
        toastError(message);
        return;
      }

      try {
        setLoading(true);
        setLoadError(null);

        const [courseResponse, relatedResponse] = await Promise.all([
          fetchCourseById(id),
          fetchRelatedCourses(id),
        ]);

        setCourse(courseResponse);
        setRelatedCourses(relatedResponse);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load course details";
        setLoadError(message);
        setCourse(null);
        setRelatedCourses([]);
        toastError(message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id, toastError]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  };

  const formatLessonDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatLastUpdated = (date?: string) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <LoadingFullPage />;
  }

  if (loadError || !course) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Course not found
          </h1>
          <p className="text-gray-600 mb-6">
            {loadError || "The course you're looking for does not exist."}
          </p>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const sections = course.sections || [];
  const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const progressPercentage = course.enrollmentProgress ?? 0;
  const completedLessons = Math.round((totalLessons * progressPercentage) / 100);
  const categoryLabel = course.categories?.[0] || "General";
  const originalPrice = course.discountPrice > 0 && course.discountPrice < course.price
    ? course.price
    : null;
  const currentPrice = course.discountPrice > 0 && course.discountPrice < course.price
    ? course.discountPrice
    : course.price;

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 lg:h-96">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-4 mb-2">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {categoryLabel}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-gray-200">{course.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About this course
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {course.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{formatDuration(course.duration)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="font-semibold">
                      {course.enrollmentCount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold">
                      {course.rating.toFixed(1)} ({course.ratingCount})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Lessons</p>
                    <p className="font-semibold">
                      {totalLessons}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What you'll learn
              </h2>
              <div className="space-y-3">
                {(course.whatYouLearn || []).map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <div className="space-y-2">
                {(course.requirements || []).map((req, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <p className="text-gray-700">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Course Content
              </h2>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {completedLessons} of {totalLessons} lessons completed
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {sections.map((section, sectionIndex) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        Section {sectionIndex + 1}: {section.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.isPreview ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
                            >
                              {lesson.isPreview ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <span className="text-sm text-gray-900">{lesson.title}</span>
                              <p className="text-xs text-gray-500">{lesson.description}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatLessonDuration(lesson.durationSeconds)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Instructor
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {course.instructor.image ? (
                    <img src={course.instructor.image} alt={course.instructor.name} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {course.instructor.name}
                  </h4>
                  <p className="text-sm text-gray-600">Course Instructor</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Learn from an experienced instructor in this subject area.</p>
            </div>

            {/* Course Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Course Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">{course.language || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{categoryLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{formatLastUpdated(course.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Price and Enroll */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {course.isFree ? "Free" : `$${currentPrice}`}
                  </span>
                  {originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${originalPrice}
                    </span>
                  )}
                </div>
                {originalPrice && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save ${originalPrice - currentPrice} (
                    {Math.round((1 - currentPrice / originalPrice) * 100)}%
                    off)
                  </p>
                )}
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                {course.isEnrolled ? "Continue Learning" : "Enroll Now"}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                30-day money back guarantee
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Courses</h2>

          {relatedCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">No related courses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

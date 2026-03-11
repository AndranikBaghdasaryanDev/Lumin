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

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  instructor: string;
  instructorBio: string;
  level: string;
  category: string;
  language: string;
  lastUpdated: string;
  certificate: boolean;
  whatYouLearn: string[];
  requirements: string[];
  modules: Module[];
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Mock course data - in a real app, this would come from an API
  const courseData: { [key: string]: Course } = {
    "1": {
      id: "1",
      title: "React.js Complete Guide",
      description:
        "Learn React.js from scratch and build modern web applications with hooks, context, and best practices. This comprehensive course covers everything you need to become a React developer.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      duration: "12 hours",
      students: 1234,
      rating: 4.8,
      reviews: 234,
      price: 89,
      originalPrice: 149,
      instructor: "John Smith",
      instructorBio:
        "John is a senior React developer with 10+ years of experience building scalable web applications.",
      level: "Beginner",
      category: "Web Development",
      language: "English",
      lastUpdated: "March 2024",
      certificate: true,
      whatYouLearn: [
        "Build modern React applications from scratch",
        "Master React Hooks and Context API",
        "Understand component lifecycle and state management",
        "Implement routing and navigation",
        "Work with forms and user input",
        "Deploy React applications to production",
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Understanding of programming concepts",
        "A computer with internet connection",
      ],
      modules: [
        {
          id: 1,
          title: "Introduction to React",
          lessons: [
            {
              id: 1,
              title: "What is React?",
              duration: "8:45",
              completed: true,
            },
            {
              id: 2,
              title: "Setting up Development Environment",
              duration: "12:30",
              completed: true,
            },
            {
              id: 3,
              title: "Your First React Component",
              duration: "15:20",
              completed: false,
            },
            {
              id: 4,
              title: "Understanding JSX",
              duration: "10:15",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "React Components",
          lessons: [
            {
              id: 5,
              title: "Functional vs Class Components",
              duration: "18:45",
              completed: false,
            },
            {
              id: 6,
              title: "Props and PropTypes",
              duration: "14:20",
              completed: false,
            },
            {
              id: 7,
              title: "State Management Basics",
              duration: "20:30",
              completed: false,
            },
            {
              id: 8,
              title: "Event Handling",
              duration: "16:10",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "React Hooks",
          lessons: [
            {
              id: 9,
              title: "Introduction to Hooks",
              duration: "12:00",
              completed: false,
            },
            {
              id: 10,
              title: "useState Hook Deep Dive",
              duration: "22:15",
              completed: false,
            },
            {
              id: 11,
              title: "useEffect Hook",
              duration: "25:40",
              completed: false,
            },
            {
              id: 12,
              title: "Custom Hooks",
              duration: "18:30",
              completed: false,
            },
          ],
        },
      ],
    },
  };

  const course = courseData[id || "1"];

  if (!course) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Course not found
          </h1>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const completedLessons = course.modules.reduce(
    (acc: number, module: Module) => {
      return (
        acc + module.lessons.filter((lesson: Lesson) => lesson.completed).length
      );
    },
    0,
  );

  const totalLessons = course.modules.reduce((acc: number, module: Module) => {
    return acc + module.lessons.length;
  }, 0);

  const progressPercentage = (completedLessons / totalLessons) * 100;

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
              src={course.image}
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
                  {course.category}
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
                    <p className="font-semibold">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="font-semibold">
                      {course.students.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold">
                      {course.rating} ({course.reviews})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Certificate</p>
                    <p className="font-semibold">
                      {course.certificate ? "Yes" : "No"}
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
                {course.whatYouLearn.map((item: string, index: number) => (
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
                {course.requirements.map((req: string, index: number) => (
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
                {course.modules.map((module: Module, moduleIndex: number) => (
                  <div
                    key={module.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {module.lessons.map((lesson: Lesson) => (
                        <div
                          key={lesson.id}
                          className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                            lesson.completed ? "bg-green-50" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                lesson.completed
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </div>
                            <span
                              className={`text-sm ${lesson.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                            >
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {lesson.duration}
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
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {course.instructor}
                  </h4>
                  <p className="text-sm text-gray-600">Senior Developer</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{course.instructorBio}</p>
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
                  <span className="font-medium">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{course.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Price and Enroll */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${course.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${course.originalPrice}
                  </span>
                </div>
                <p className="text-sm text-green-600 font-medium mt-1">
                  Save ${course.originalPrice - course.price} (
                  {Math.round((1 - course.price / course.originalPrice) * 100)}%
                  off)
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Enroll Now
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                30-day money back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

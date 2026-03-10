import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { Search, ChevronDown } from "lucide-react";

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: "1",
      title: "React.js Complete Guide",
      description:
        "Learn React.js from scratch and build modern web applications with hooks, context, and best practices.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      duration: "12 hours",
      students: 1234,
      rating: 4.8,
      price: 89,
      instructor: "John Smith",
      level: "Beginner",
    },
    {
      id: "2",
      title: "Advanced Node.js",
      description:
        "Master Node.js backend development with Express, MongoDB, authentication, and deployment strategies.",
      image:
        "https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=400&h=250&fit=crop",
      duration: "16 hours",
      students: 856,
      rating: 4.9,
      price: 129,
      instructor: "Sarah Johnson",
      level: "Advanced",
    },
    {
      id: "3",
      title: "CSS Mastery Course",
      description:
        "Become a CSS expert with modern techniques including Flexbox, Grid, animations, and responsive design.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      duration: "8 hours",
      students: 2341,
      rating: 4.7,
      price: 69,
      instructor: "Emily Davis",
      level: "Intermediate",
    },
    {
      id: "4",
      title: "JavaScript Fundamentals",
      description:
        "Start your programming journey with JavaScript basics, ES6+, and modern development practices.",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      duration: "10 hours",
      students: 3456,
      rating: 4.6,
      price: 79,
      instructor: "Michael Brown",
      level: "Beginner",
    },
    {
      id: "5",
      title: "Python for Data Science",
      description:
        "Learn Python programming with focus on data analysis, visualization, and machine learning basics.",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      duration: "20 hours",
      students: 1876,
      rating: 4.8,
      price: 149,
      instructor: "Lisa Anderson",
      level: "Intermediate",
    },
    {
      id: "6",
      title: "Vue.js 3 Complete Course",
      description:
        "Build modern single-page applications with Vue.js 3, Composition API, and ecosystem tools.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      duration: "14 hours",
      students: 654,
      rating: 4.7,
      price: 99,
      instructor: "David Wilson",
      level: "Intermediate",
    },
    {
      id: "7",
      title: "TypeScript Masterclass",
      description:
        "Master TypeScript and write type-safe JavaScript applications with advanced type system features.",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      duration: "12 hours",
      students: 923,
      rating: 4.9,
      price: 109,
      instructor: "Robert Taylor",
      level: "Advanced",
    },
    {
      id: "8",
      title: "Git & GitHub Essentials",
      description:
        "Learn version control with Git, collaborate with GitHub, and master professional workflows.",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop",
      duration: "6 hours",
      students: 2890,
      rating: 4.5,
      price: 49,
      instructor: "James Martinez",
      level: "Beginner",
    },
  ];

  const categories = [
    "all",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "DevOps",
  ];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "Web Development" &&
        course.title.toLowerCase().includes("react")) ||
      course.title.toLowerCase().includes("node") ||
      course.title.toLowerCase().includes("css") ||
      course.title.toLowerCase().includes("javascript") ||
      course.title.toLowerCase().includes("vue") ||
      course.title.toLowerCase().includes("typescript") ||
      (selectedCategory === "Data Science" &&
        course.title.toLowerCase().includes("python")) ||
      (selectedCategory === "Mobile Development" &&
        course.title.toLowerCase().includes("mobile")) ||
      (selectedCategory === "DevOps" &&
        course.title.toLowerCase().includes("git"));

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-2">
            Explore our comprehensive course catalog
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredCourses.length}
            </span>{" "}
            courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;

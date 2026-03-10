import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Activity,
  Award,
} from "lucide-react";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: Users,
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: "42",
      icon: BookOpen,
      change: "+5%",
      color: "bg-green-500",
    },
    {
      title: "Completion Rate",
      value: "78%",
      icon: TrendingUp,
      change: "+8%",
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: DollarSign,
      change: "+15%",
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      student: "John Doe",
      course: "React Basics",
      action: "completed",
      time: "2 hours ago",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Node.js Fundamentals",
      action: "enrolled",
      time: "4 hours ago",
    },
    {
      id: 3,
      student: "Bob Johnson",
      course: "CSS Mastery",
      action: "started",
      time: "6 hours ago",
    },
    {
      id: 4,
      student: "Alice Brown",
      course: "JavaScript Advanced",
      action: "completed",
      time: "1 day ago",
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your education dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Course Progress Overview
            </h2>
            <div className="space-y-4">
              {[
                { name: "React Basics", progress: 75, students: 234 },
                { name: "Node.js Fundamentals", progress: 60, students: 189 },
                { name: "CSS Mastery", progress: 85, students: 156 },
                { name: "JavaScript Advanced", progress: 45, students: 98 },
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {course.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.students} students
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {course.progress}% complete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Activity className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.student}</span>
                      <span className="text-gray-600"> {activity.action} </span>
                      <span className="font-medium">{activity.course}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Courses */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Top Performing Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "React Basics",
                students: 234,
                rating: 4.8,
                revenue: "$4,680",
              },
              {
                title: "Node.js Fundamentals",
                students: 189,
                rating: 4.6,
                revenue: "$3,780",
              },
              {
                title: "CSS Mastery",
                students: 156,
                rating: 4.9,
                revenue: "$3,120",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">⭐ {course.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium">{course.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import { useState } from "react";
import {
  BookOpen,
  Users,
  Award,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      icon: Users,
      change: 12.5,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Courses",
      value: "24",
      icon: BookOpen,
      change: -2.3,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Revenue",
      value: "$48,291",
      icon: DollarSign,
      change: 8.7,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Completion Rate",
      value: "87.3%",
      icon: Award,
      change: 5.2,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      student: "Sarah Johnson",
      course: "React Fundamentals",
      action: "completed",
      time: "2 minutes ago",
      avatar: "SJ",
    },
    {
      id: 2,
      student: "Mike Chen",
      course: "Advanced JavaScript",
      action: "enrolled",
      time: "15 minutes ago",
      avatar: "MC",
    },
    {
      id: 3,
      student: "Emily Davis",
      course: "Node.js Masterclass",
      action: "submitted assignment",
      time: "1 hour ago",
      avatar: "ED",
    },
    {
      id: 4,
      student: "Alex Wilson",
      course: "CSS Animations",
      action: "started",
      time: "2 hours ago",
      avatar: "AW",
    },
  ];

  const courses = [
    {
      name: "React Fundamentals",
      progress: 78,
      students: 342,
      status: "active",
    },
    {
      name: "Advanced JavaScript",
      progress: 92,
      students: 218,
      status: "active",
    },
    {
      name: "Node.js Masterclass",
      progress: 45,
      students: 156,
      status: "active",
    },
    {
      name: "CSS Animations",
      progress: 100,
      students: 89,
      status: "completed",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName || 'Admin'}!
            </h1>
            <p className="text-gray-600">Here's what's happening with your courses today.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Course Progress Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {course.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{course.students} students</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'active' ? 'bg-green-100 text-green-700' :
                          course.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
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
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{activity.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.student}</span> {activity.action} {activity.course}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

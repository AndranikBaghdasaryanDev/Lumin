import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardLayout from "../components/DashboardLayout";
import DashboardPage from "../pages/dashboard";
import { CoursesPage } from "../pages/courses";
import CourseDetails from "../pages/CourseDetails";
import { CategoriesPage } from "../pages/Categories";
import { PaginationDemo } from "../pages/pagination-demo";
import { ProfilePage } from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    element: <Layout />, // parent layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/pagination-demo", element: <PaginationDemo /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <DashboardPage /> }],
      },
      {
        path: "/courses",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <CoursesPage /> },
          { path: ":id", element: <CourseDetails /> },
        ],
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <CategoriesPage /> }],
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <ProfilePage /> }],
      },
    ],
  },
]);

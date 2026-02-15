import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { DashBoard } from "../pages/dashboard";
import CoursesListingPage from "../pages/CourseListingPage";
import { CategoriesPage } from "../pages/Categories";
import { PaginationDemo } from "../pages/pagination-demo";
import CourseDetailsPage from "../pages/course-details";

export const router = createBrowserRouter([
  {
    element: <Layout />, // parent layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/pagination-demo", element: <PaginationDemo /> },
      {
        path: "/courses",
        element: (
          <ProtectedRoute>
            <CoursesListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses/:id",
        element: (
          <ProtectedRoute>
            <CourseDetailsPage />
          </ProtectedRoute>
        ),
      },
      { path: "/courses/:id", element: <CourseDetailsPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

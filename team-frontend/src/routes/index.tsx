import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { DashBoard } from "../pages/dashboard";
import CoursesListingPage from "../pages/CourseListingPage";

export const router = createBrowserRouter([
  {
    element: <Layout />, // parent layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      { 
        path: '/courses', 
        element: ( 
        <ProtectedRoute>
          <CoursesListingPage/>
        </ProtectedRoute>
        )
       }
    ],
  },
]);

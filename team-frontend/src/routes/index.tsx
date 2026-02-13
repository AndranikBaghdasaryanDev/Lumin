import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { DashBoard } from "../pages/dashboard";
import CategoriesPage from "../pages/Categories";

export const router = createBrowserRouter([
  {
    element: <Layout />, // parent layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: '/categories', 
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        )
       },
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

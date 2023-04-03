import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Singup from "./pages/Singup";
import UserForm from "./pages/UserForm";
import Users from "./pages/Users";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout></DefaultLayout>,
    children: [
      {
        path: "/",
        element: <Navigate to="/users"></Navigate>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/users",
        element: <Users></Users>,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate"></UserForm>,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate"></UserForm>,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout></GuestLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Singup></Singup>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default routes;

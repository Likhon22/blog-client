import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../pages/Admin/AdminHome";
import CreateArticle from "../pages/Admin/CreateArticle";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import SingleBlog from "../pages/SingleBlog/SingleBlog";

import ManageArticle from "../pages/Admin/ManageArticle";
import EditSingleArticle from "../pages/Admin/EditSingleArticle";
import CategoryWiseArticle from "../pages/CategoryWiseArticle/CategoryWiseArticle";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Admin/ManageUsers";
import About from "../pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <AllBlogs />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/category/:id",
        element: <CategoryWiseArticle />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "create-article",
        element: <CreateArticle />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-article",
        element: <ManageArticle />,
      },
      {
        path: "edit-article/:id",
        element: <EditSingleArticle />,
      },
    ],
  },
]);

export default router;

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
    element: <Dashboard />,
    children: [
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "create-article",
        element: <CreateArticle />,
      },
    ],
  },
]);

export default router;

import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaTrash, FaPlus } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { BsGrid1X2Fill } from "react-icons/bs";
import Loader from "../../components/Loader/Loader";
import { axiosInstance } from "../../utils";
import Swal from "sweetalert2";

const AdminHome = () => {
  // Fetch users
  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/all-users");
      return response.data;
    },
  });
  // Fetch blogs
  const { data: blogs, isLoading: blogLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles/all-articles");
      return response.data;
    },
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: categoryLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/categories/${id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.error("Error deleting category:", err);
        }
      }
    });
  };

  if (userLoading || blogLoading || categoryLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor and manage your blogs key metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FaUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Total Users
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {users?.data?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 px-5 py-2">
              <div className="text-sm text-blue-600">
                Registered accounts in your system
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <RiArticleFill className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Total Articles
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {blogs?.data?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 px-5 py-2">
              <div className="text-sm text-green-600">
                Published content on your blog
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <BsGrid1X2Fill className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Categories
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {categories?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 px-5 py-2">
              <div className="text-sm text-purple-600">
                Content organization categories
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FaPlus className="mr-1" /> Add New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Articles
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories?.length > 0 &&
                  categories?.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {blogs?.data?.data
                            ? blogs.data.data.filter(
                                (blog) => blog?.category === category?.name
                              ).length
                            : blogs?.data
                            ? blogs.data.filter(
                                (blog) => blog?.category === category?.name
                              ).length
                            : 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                        >
                          <FaTrash className="inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recently Registered Users
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.data?.slice(0, 5).map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users?.data?.length > 5 && (
            <div className="px-6 py-3 border-t border-gray-200">
              <button className="text-sm text-primary-600 hover:text-primary-800">
                View all users
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

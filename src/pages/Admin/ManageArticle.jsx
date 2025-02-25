import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useAuth from "../../hooks/useAuth";

const ManageArticle = () => {
  const { user } = useAuth();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles/all-articles?email=${user?.email}`
      );
      return response.data;
    },
  });
  console.log(blogs);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && blogs?.data?.length <= 0) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-red-500 font-medium">
        No Blogs Found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Articles</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">#</th>
              <th className="border border-gray-300 p-3 text-left">Title</th>
              <th className="border border-gray-300 p-3 text-left">Category</th>
              <th className="border border-gray-300 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.data?.length > 0 &&
              blogs?.data?.map((article, index) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3">
                    {article.title}
                  </td>
                  <td className="border border-gray-300 p-3 capitalize">
                    {article.category}
                  </td>
                  <td className="border border-gray-300 p-3 flex gap-2">
                    <Link to={`/dashboard/edit-article/${article._id}`}>
                      <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
                        <FaEdit /> Edit
                      </button>
                    </Link>
                    <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageArticle;

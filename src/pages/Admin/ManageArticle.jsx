import { useQuery } from "@tanstack/react-query";

import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosInstance } from "../../utils";
const ManageArticle = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles/all-articles?email=${user?.email}&limit=${limit}&page=${currentPage}`
      );
      return response.data;
    },
  });

  const pages = blogs?.meta?.totalPages;
  const pageArray = new Array(pages).fill(0);

  const handleDeleteArticle = async (id) => {
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
          await axiosInstance.delete(`/articles/${id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

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
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-center items-center mt-6 mb-12">
        {pages > 1 &&
          pageArray?.map((_, page) => (
            <button
              onClick={() => setCurrentPage(page + 1)}
              key={page}
              className={`join-item btn ${
                currentPage === page + 1 ? "bg-blue-400 text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ManageArticle;

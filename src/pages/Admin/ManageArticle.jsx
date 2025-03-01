import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { axiosInstance } from "../../utils";

const ManageArticle = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", currentPage, searchTerm],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles/all-articles?email=${
          user?.email
        }&limit=${limit}&page=${currentPage}${
          searchTerm ? `&searchTerm=${searchTerm}` : ""
        }`
      );
      return response.data;
    },
  });

  const pages = blogs?.meta?.totalPages || 0;
  const totalArticles = blogs?.meta?.total || 0;

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
            text: "Your article has been deleted.",
            icon: "success",
          });
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
          console.log(err);
        }
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);

    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header section */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FaFileAlt className="text-indigo-600 text-xl mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manage Articles
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {totalArticles} {totalArticles === 1 ? "article" : "articles"}{" "}
                  found
                </p>
              </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full md:w-64 pr-10 pl-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-indigo-600 text-white rounded-r-md"
                >
                  <FaSearch className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {blogs?.data?.length > 0 ? (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs?.data?.map((article, index) => (
                    <tr
                      key={article._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {article.bannerImg ? (
                            <img
                              className="h-10 w-10 rounded object-cover mr-3"
                              src={article.bannerImg}
                              alt={article.title}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-indigo-100 flex items-center justify-center mr-3">
                              <FaFileAlt className="text-indigo-400" />
                            </div>
                          )}
                          <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                            {article.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800 capitalize">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link to={`/dashboard/edit-article/${article._id}`}>
                            <button className="bg-emerald-500 cursor-pointer text-white px-3 py-1.5 rounded text-xs font-medium flex items-center transition-colors hover:bg-emerald-600">
                              <FaEdit className="mr-1" /> Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteArticle(article._id)}
                            className="bg-rose-500 cursor-pointer text-white px-3 py-1.5 rounded text-xs font-medium flex items-center transition-colors hover:bg-rose-600"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-gray-50">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, pages))
                    }
                    disabled={currentPage === pages}
                    className={`relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === pages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      {/* Previous button */}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: pages }, (_, i) => {
                        // Show fewer page buttons for better UX
                        if (
                          pages <= 7 ||
                          i + 1 === 1 ||
                          i + 1 === pages ||
                          (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === i + 1
                                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {i + 1}
                            </button>
                          );
                        } else if (
                          i + 1 === currentPage - 2 ||
                          i + 1 === currentPage + 2
                        ) {
                          return (
                            <span
                              key={i}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      {/* Next button */}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, pages))
                        }
                        disabled={currentPage === pages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                          currentPage === pages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-indigo-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No articles found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first article.
            </p>
            <Link
              to="/dashboard/create-article"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaFileAlt className="mr-2 -ml-1 h-5 w-5" />
              Create Article
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageArticle;

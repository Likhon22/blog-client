import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  FaLongArrowAltRight,
  FaCalendarAlt,
  FaUser,
  FaFilter,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { axiosInstance } from "../../utils";

const CategoryWiseArticle = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewLayout, setViewLayout] = useState("grid"); // "grid", "list"
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const limit = 9;

  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["category", id, currentPage, sortOrder],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/articles/all-articles?category=${encodeURIComponent(
          id
        )}&limit=${limit}&page=${currentPage}&sort=${sortOrder}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    console.log("Category data:", {
      category: id,
      articlesCount: blogs?.data?.length || 0,
      totalPages: blogs?.meta?.totalPages || 0,
    });
  }, [blogs, id]);

  // Format category name for display
  const formatCategoryName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < (blogs?.meta?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const totalPages = blogs?.meta?.totalPages || 0;
  const firstArticle = blogs?.data?.[0];
  const remainingArticles = blogs?.data?.slice(1) || [];
  const hasMultipleArticles = (blogs?.data?.length || 0) > 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {formatCategoryName(id)} Articles
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our collection of insightful {formatCategoryName(id)}{" "}
            articles, designed to inform and inspire you.
          </p>
        </div>
      </div>

      {/* Featured Post Section */}
      {firstArticle && (
        <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto relative">
                {!bannerLoaded && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="animate-pulse h-8 w-8 rounded-full border-2 border-t-transparent border-blue-600"></div>
                  </div>
                )}
                <img
                  src={
                    firstArticle?.bannerImg ||
                    "https://placehold.co/1200x800/1a365d/FFFFFF?text=Featured+Article"
                  }
                  alt={firstArticle?.title}
                  className="h-full w-full object-cover"
                  onLoad={() => setBannerLoaded(true)}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/1200x800/1a365d/FFFFFF?text=Featured+Article";
                    setBannerLoaded(true);
                  }}
                />
              </div>

              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                    {formatCategoryName(firstArticle?.category)}
                  </span>
                </div>

                <Link to={`/blog/${firstArticle?._id}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-700 transition-colors duration-200">
                    {firstArticle?.title}
                  </h2>
                </Link>

                <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-4">
                  {firstArticle?.author && (
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-400" />
                      <span>{firstArticle.author.name}</span>
                    </div>
                  )}

                  {firstArticle?.createdAt && (
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      <span>
                        {new Date(firstArticle.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {firstArticle?.post && (
                  <p className="text-gray-600 line-clamp-3 mb-5">
                    {firstArticle.post
                      .replace(/<[^>]+>/g, "")
                      .substring(0, 150)}
                    ...
                  </p>
                )}

                <Link
                  to={`/blog/${firstArticle?._id}`}
                  className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-start"
                >
                  Read Article <FaLongArrowAltRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple header when there's only 0-1 articles */}
      {!hasMultipleArticles && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {blogs?.meta?.totalDocuments || 0} {formatCategoryName(id)}{" "}
            {blogs?.meta?.totalDocuments === 1 ? "Article" : "Articles"}
          </h2>
        </div>
      )}

      {/* Filter and Layout Controls - Only shown when there are multiple articles */}
      {hasMultipleArticles && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              {blogs?.meta?.totalDocuments || 0} {formatCategoryName(id)}{" "}
              Articles
            </h2>

            <div className="flex flex-wrap gap-4">
              {/* Sort Controls */}
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
                  <FaFilter className="text-gray-500 mr-2" />
                  <select
                    className="bg-transparent border-none focus:ring-0 text-gray-700 pr-8"
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Layout Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className={`px-4 py-2 ${
                    viewLayout === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setViewLayout("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  className={`px-4 py-2 ${
                    viewLayout === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setViewLayout("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      {blogs?.data?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {remainingArticles.length > 0 ? (
            <>
              {viewLayout === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingArticles.map((blog) => (
                    <div key={blog._id} className="article-card-wrapper">
                      <Link to={`/blog/${blog._id}`}>
                        <ArticleCard blog={blog} />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {remainingArticles.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48">
                          <img
                            src={
                              blog?.bannerImg ||
                              "https://placehold.co/600x400/1a365d/FFFFFF?text=Article"
                            }
                            alt={blog?.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/600x400/1a365d/FFFFFF?text=Article";
                            }}
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                              {formatCategoryName(blog?.category)}
                            </span>
                          </div>
                          <Link to={`/blog/${blog?._id}`}>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors">
                              {blog?.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {blog?.post
                              ?.replace(/<[^>]+>/g, "")
                              .substring(0, 120)}
                            ...
                          </p>
                          <div className="flex items-center text-gray-500 text-xs gap-4">
                            {blog?.author && (
                              <div className="flex items-center">
                                <FaUser className="mr-1 text-gray-400" />
                                <span>{blog.author.name}</span>
                              </div>
                            )}
                            {blog?.createdAt && (
                              <div className="flex items-center">
                                <FaCalendarAlt className="mr-1 text-gray-400" />
                                <span>
                                  {new Date(
                                    blog.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              <p>
                No additional articles found in this category. This article is
                the only one available.
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleLeft className="h-5 w-5" />
                </button>

                {[...Array(totalPages)].map((_, page) => {
                  // Show limited page numbers with ellipsis for better UX
                  const pageNumber = page + 1;

                  // Show first, last, current and nearby pages
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 text-sm font-medium border ${
                          currentPage === pageNumber
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }

                  // Show ellipsis when we're skipping pages
                  if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 &&
                      currentPage < totalPages - 2)
                  ) {
                    return (
                      <span
                        key={page}
                        className="px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700"
                      >
                        ...
                      </span>
                    );
                  }

                  // Hide other pages
                  return null;
                })}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-24 mb-16">
          <img
            src="https://placehold.co/300x200/e2e8f0/64748b?text=No+Articles"
            alt="No articles found"
            className="w-64 h-auto mb-6 opacity-80"
          />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Articles Found
          </h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            We couldn't find any articles in the {formatCategoryName(id)}{" "}
            category. Please check back later or browse other categories.
          </p>
          <Link
            to="/blogs"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Browse All Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryWiseArticle;

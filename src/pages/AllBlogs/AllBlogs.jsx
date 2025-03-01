import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi"; // We'll keep React Icons
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Loader from "../../components/Loader/Loader";

const AllBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scrolling effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: async () => {
      return await axiosInstance.get(
        `/articles/all-articles?limit=${limit}&page=${currentPage}`
      );
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && blogs?.data?.data?.length <= 0) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-700 font-medium">
        <div className="text-center">
          <svg
            className="w-20 h-20 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          <h2 className="mt-4">No Blogs Found</h2>
          <p className="text-base text-gray-500 mt-2">
            Check back later for new content
          </p>
        </div>
      </div>
    );
  }

  const pages = blogs?.data?.meta?.totalPages;
  const pageArray = new Array(pages).fill(0);
  const firstArticle = blogs?.data?.data?.[0];

  // Format date for featured article
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero section with featured article */}
      {firstArticle && (
        <div className="relative h-[80vh] md:h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
            style={{
              backgroundImage: `url(${firstArticle?.bannerImg})`,
              transform: isScrolled ? "scale(1.05)" : "scale(1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
          </div>

          <div className="container mx-auto h-full flex items-end pb-16 md:pb-20 px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                to={`/category/${firstArticle?.category}`}
                className="inline-block"
              >
                <span className="capitalize px-4 py-1.5 bg-primary/90 text-white font-medium rounded-full text-sm hover:bg-primary transition-all">
                  {firstArticle?.category}
                </span>
              </Link>

              <Link
                to={`/blog/${firstArticle?._id}`}
                className="block mt-3 group"
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight group-hover:text-primary-content/90 transition-colors">
                  {firstArticle.title}
                </h1>
              </Link>

              <div className="mt-6 flex items-center text-gray-300 text-sm">
                <span className="flex items-center">
                  <FiCalendar className="mr-2" />
                  {formatDate(firstArticle.createdAt)}
                </span>
                <span className="mx-3">•</span>
                <span className="flex items-center">
                  <FiClock className="mr-2" />
                  {firstArticle.readTime || "5 min read"}
                </span>
              </div>

              <p className="mt-4 text-gray-200 text-lg max-w-3xl line-clamp-2 md:line-clamp-3">
                {firstArticle.description}
              </p>

              <Link
                to={`/blog/${firstArticle?._id}`}
                className="inline-flex items-center mt-6 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-medium transition-all group"
              >
                Read Article
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Latest articles section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            Latest Articles
          </h2>
          <div className="divider w-24 h-1 bg-primary mx-auto my-4 rounded-full"></div>
          <p className="mt-4 text-base-content/70 text-lg">
            Discover insightful articles, trends, and fresh perspectives from
            our community of writers.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
          {blogs?.data?.data?.map((blog) => (
            <div key={blog._id} className="card-wrapper">
              <ArticleCard blog={blog} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="join bg-base-200 rounded-full p-1">
              {pageArray?.map((_, page) => (
                <button
                  onClick={() => setCurrentPage(page + 1)}
                  key={page}
                  className={`join-item btn ${
                    currentPage === page + 1
                      ? "btn-primary text-white"
                      : "btn-ghost"
                  } rounded-full px-4`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;

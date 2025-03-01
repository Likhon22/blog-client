import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { axiosInstance } from "../../../utils";

const Banner = () => {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scrolling effect for banner
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await axiosInstance.get(`/articles/all-articles`);
    },
  });

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", search],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles/all-articles?searchTerm=${search}`
      );
      return response.data;
    },
    enabled: !!search && !!blogs?.data?.data?.length > 0,
    staleTime: 60000,
  });

  const firstArticle = blogs?.data?.data?.[0];
  if (firstArticle && !firstArticle?.bannerImg) {
    return <Loader />;
  }
  // Format date for featured article
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage: `url(${firstArticle?.bannerImg})`,
          transform: isScrolled ? "scale(1.05)" : "scale(1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Search Box and Content Overlay */}
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
        <div className="text-center  mt-20 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl mx-auto">
            Explore the world of thoughts, ideas, and perspectives
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover articles that inspire, inform, and ignite your curiosity
          </p>
        </div>

        {/* Search Container - Keep everything related to search in one container */}
        <div className="w-full max-w-2xl mx-auto relative">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for articles, topics, and more..."
              className="input input-bordered rounded-full w-full py-4 pl-6 pr-14 text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white/10 backdrop-blur-md text-white placeholder-gray-300 border-white/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <FiSearch className="w-6 h-6 text-gray-200" />
            </div>
          </div>

          {/* Search Results - Absolute positioning to ensure it's below the input */}
          <div className="absolute left-0 right-0 mt-2 z-[60]">
            {error && (
              <div className="bg-red-500/90 backdrop-blur-md text-white px-4 py-3 rounded-lg mt-2 text-center font-medium">
                Error fetching results. Please try again.
              </div>
            )}

            {isLoading && search ? (
              <div className="flex justify-center py-8 bg-white/10 backdrop-blur-md rounded-lg">
                <Loader />
              </div>
            ) : (
              <>
                {search && results?.data?.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl max-h-[400px] overflow-y-auto divide-y divide-white/10">
                    {results?.data?.map((result, index) => (
                      <Link key={index} to={`/blog/${result._id}`}>
                        <div className="hover:bg-white/5 transition-all py-3 px-4">
                          <div className="flex items-center gap-3">
                            {result.bannerImg && (
                              <img
                                src={result.bannerImg}
                                alt={result.title}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-white">
                                {result.title}
                              </p>
                              {result.category && (
                                <span className="text-xs bg-primary/30 text-white px-2 py-1 rounded-full inline-block mt-1">
                                  {result.category}
                                </span>
                              )}
                            </div>
                            <FiArrowRight className="text-gray-400" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {search && results?.data?.length === 0 && (
                  <div className="bg-white/10 backdrop-blur-md text-white px-4 py-6 rounded-xl text-center">
                    <p className="font-medium">No results found for {search}</p>
                    <p className="text-gray-300 text-sm mt-1">
                      Try using different keywords
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Featured Article Info */}
        {firstArticle && (
          <div className="mt-auto mb-12 text-center w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-sm text-gray-300 mb-2">
              <span className="flex items-center">
                <FiCalendar className="mr-1" />
                {formatDate(firstArticle.createdAt)}
              </span>
            </div>
            <Link to={`/blog/${firstArticle._id}`} className="group">
              <p className="text-lg md:text-xl text-white font-medium hover:text-primary-content/90 transition-colors">
                {firstArticle.title}
              </p>
              <div className="flex items-center justify-center mt-3">
                <span className="text-sm text-primary group-hover:underline">
                  Read Article
                </span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-primary" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;

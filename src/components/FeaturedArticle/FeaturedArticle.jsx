import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { axiosInstance } from "../../utils";
import Loader from "../Loader/Loader";

const FeaturedArticle = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-article"],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles/featured-article");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const featuredArticle = data?.data;
  console.log(featuredArticle);
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate read time if not provided
  const getReadTime = (article) => {
    if (article.readTime) return article.readTime;

    const wordsPerMinute = 200;
    const text = article.post || "";
    const textLength = text.split(" ").length;
    const readTime = Math.max(1, Math.ceil(textLength / wordsPerMinute));
    return `${readTime} min read`;
  };

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!featuredArticle) {
    return null; // Don't render if no featured article found
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <h2 className="text-2xl capitalize font-semibold tracking-wider text-primary">
            Featured Article
          </h2>
        </div>
        <div className="w-24 h-1 bg-primary mx-auto my-2 rounded-full"></div>
        <p className="mt-4 text-gray-600 text-lg pb-8">
          Check out the featured from our community.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row bg-base-100 rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto">
        {/* Featured Image */}
        <div className="lg:w-1/2 h-80 lg:h-auto relative">
          <img
            src={featuredArticle.bannerImg}
            alt={featuredArticle.title}
            className="w-full h-full object-cover"
          />
          {featuredArticle.category && (
            <div className="absolute top-4 left-4">
              <Link
                to={`/category/${featuredArticle.category}`}
                className="badge badge-primary badge-lg"
              >
                {featuredArticle.category}
              </Link>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col">
          <div className="flex-1">
            <Link to={`/blog/${featuredArticle._id}`}>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-primary transition-colors">
                {featuredArticle.title}
              </h3>
            </Link>

            <p className="text-base-content/70 mb-6 line-clamp-3">
              {/* Extract text content from HTML if your content is HTML */}
              {featuredArticle.description ||
                featuredArticle.post
                  ?.replace(/<[^>]+>/g, "")
                  .substring(0, 200) + "..."}
            </p>

            <div className="flex flex-wrap gap-y-3 items-center text-sm text-base-content/70 mb-6">
              <div className="flex items-center mr-6">
                <FiUser className="mr-2" />
                <span>{featuredArticle?.author?.name || "Unknown Author"}</span>
              </div>

              <div className="flex items-center mr-6">
                <FiCalendar className="mr-2" />
                <span>{formatDate(featuredArticle.createdAt)}</span>
              </div>

              <div className="flex items-center">
                <FiClock className="mr-2" />
                <span>{getReadTime(featuredArticle)}</span>
              </div>
            </div>
          </div>

          <Link
            to={`/blog/${featuredArticle._id}`}
            className="btn btn-primary mt-2"
          >
            Read Full Article <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;

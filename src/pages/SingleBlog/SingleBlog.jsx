import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaFacebookMessenger, FaWhatsapp, FaShareAlt } from "react-icons/fa";
import SingleArticleCard from "../../components/SingleArticleCard/SingleArticleCard";
import Loader from "../../components/Loader/Loader";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { axiosInstance } from "../../utils";
import { Helmet } from "react-helmet-async";

const SingleBlog = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/articles/single-article/${id}`);
      return res.data;
    },
  });

  const { data: blogs, isLoading: isRelatedLoading } = useQuery({
    queryKey: ["relatedBlogs", blog?.data?.category],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/articles/all-articles?category=${blog?.data?.category}`
      );
      return res.data;
    },
    enabled: !!blog,
  });

  if (isLoading) {
    return <Loader />;
  }

  const filteredRelatedBlogs = blogs?.data?.filter(
    (relatedBlog) => relatedBlog._id !== id
  );

  const shareUrl = window.location.href; // Get current page URL
  const shareText = encodeURIComponent(
    `Check out this article: ${blog?.data?.title}`
  );

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog?.data?.title,
          text: shareText,
          url: shareUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="w-full mx-auto pb-24">
      {blog && (
        <Helmet>
          <title>{blog.data.title} - Zenfla</title>
          <meta
            name="description"
            content={blog.data.excerpt || blog.data.title}
          />
          <meta
            name="keywords"
            content={`${blog.data.category}, blog article, zenfla`}
          />
          <link rel="canonical" href={`https://zenfla.vercel.app/blog/${id}`} />

          {/* Open Graph tags */}
          <meta property="og:title" content={`${blog.data.title} - Zenfla`} />
          <meta
            property="og:description"
            content={blog.data.excerpt || blog.data.title}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`https://zenfla.vercel.app/blog/${id}`}
          />
          <meta property="og:image" content={blog.data.coverImage} />
          <meta property="og:site_name" content="Zenfla" />

          {/* Article specific tags */}
          <meta
            property="article:published_time"
            content={blog.data.createdAt}
          />
          {blog.data.updatedAt && (
            <meta
              property="article:modified_time"
              content={blog.data.updatedAt}
            />
          )}
          <meta property="article:section" content={blog.data.category} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${blog.data.title} - Zenfla`} />
          <meta
            name="twitter:description"
            content={blog.data.excerpt || blog.data.title}
          />
          <meta name="twitter:image" content={blog.data.coverImage} />
        </Helmet>
      )}
      {/* Main Blog Post - Full width for banner */}
      <div className="bg-white shadow-sm mb-8">
        {/* Article Card Container - No width constraints to allow full-width hero */}
        <div className="w-full">
          <SingleArticleCard blog={blog.data} />
        </div>

        {/* Share buttons with container width */}
        <div className="container mx-auto flex justify-between items-center gap-4 mt-4 px-6 py-4">
          <div className="flex gap-4 w-full mx-auto justify-center">
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 text-2xl transition-colors"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href={`https://www.facebook.com/dialog/send?link=${shareUrl}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-2xl transition-colors"
              aria-label="Share on Facebook Messenger"
            >
              <FaFacebookMessenger />
            </a>

            <button
              onClick={handleNativeShare}
              className="text-gray-600 hover:text-gray-800 text-2xl transition-colors"
              aria-label="Share using native share"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Related Blogs Section - With container */}
      <div className="container mx-auto">
        {isRelatedLoading ? (
          <Loader />
        ) : (
          <div className="mt-12 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Related Posts
            </h2>
            {filteredRelatedBlogs?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRelatedBlogs?.slice(0, 3).map((relatedBlog) => (
                  <ArticleCard key={relatedBlog._id} blog={relatedBlog} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-lg">No related posts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;

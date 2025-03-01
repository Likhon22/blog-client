import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaFacebookMessenger, FaWhatsapp, FaShareAlt } from "react-icons/fa";
import SingleArticleCard from "../../components/SingleArticleCard/SingleArticleCard";
import Loader from "../../components/Loader/Loader";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { axiosInstance } from "../../utils";

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
  console.log(blogs?.data);

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
    <div className="container   pb-24">
      {/* Main Blog Post */}
      <div className="bg-white shadow-sm rounded-lg mb-8">
        <SingleArticleCard blog={blog.data} />
        <div className="flex justify-between items-center gap-4 mt-4 px-6 py-4">
          {/* Share Buttons */}
          <div className="flex gap-4 w-5/6 mx-auto">
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 text-2xl"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href={`https://www.facebook.com/dialog/send?link=${shareUrl}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-2xl"
              aria-label="Share on Facebook Messenger"
            >
              <FaFacebookMessenger />
            </a>

            <button
              onClick={handleNativeShare}
              className="text-gray-600 text-2xl"
              aria-label="Share using native share"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Related Blogs Section */}
      {isRelatedLoading ? (
        <Loader />
      ) : (
        <div className="w-5/6 mx-auto  mt-12">
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
  );
};

export default SingleBlog;

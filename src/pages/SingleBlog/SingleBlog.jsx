import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

  if (isLoading) {
    return <Loader />;
  }

  const filteredRelatedBlogs = blogs?.data?.filter(
    (relatedBlog) => relatedBlog._id !== id
  );
  return (
    <div className="container mx-auto px-4 pb-24">
      {/* Main Blog Post */}
      <div className="mb-8">
        <SingleArticleCard blog={blog.data} />
      </div>

      {/* Related Blogs Section */}
      {isRelatedLoading ? (
        <Loader />
      ) : (
        <div className="w-5/6 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          {filteredRelatedBlogs?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3   gap-4">
              {filteredRelatedBlogs?.slice(0, 3).map((relatedBlog) => (
                <ArticleCard key={relatedBlog._id} blog={relatedBlog} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No related posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleBlog;

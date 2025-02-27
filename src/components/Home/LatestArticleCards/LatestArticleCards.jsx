import { useQuery } from "@tanstack/react-query";

import ArticleCard from "../../ArticleCard/ArticleCard";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../utils";

const LatestArticleCards = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await axiosInstance.get("/articles/all-articles");
    },
  });
  console.log(blogs?.data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-4/5 mx-auto py-12">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-black">Latest Articles</h2>
        <p className="mt-4 text-gray-600 text-lg pb-8">
          Check out the latest blog posts from our community.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
        {blogs?.data?.data?.map((blog) => (
          <ArticleCard key={blog._id} blog={blog} />
        ))}
      </div>
      {blogs?.data?.meta?.totalDocuments > 10 && (
        <Link className="flex  justify-center" to={"/blogs"}>
          <button className="btn bg-blue-400 text-white mt-8">View All</button>
        </Link>
      )}
    </div>
  );
};

export default LatestArticleCards;

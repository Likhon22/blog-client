import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../utils";
import ArticleCard from "../../ArticleCard/ArticleCard";
import Loader from "../../Loader/Loader";

const LatestArticleCards = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await axiosInstance.get("/articles/all-articles");
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  if (!blogs?.data?.data) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-black font-medium">
        No Latest Blogs Found
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 mx-auto py-12">
      {blogs?.data?.data?.map((blog) => (
        <ArticleCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default LatestArticleCards;

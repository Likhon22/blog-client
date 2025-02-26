import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/Home/Banner/Banner";
import { axiosInstance } from "../../utils";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Loader from "../../components/Loader/Loader";
import bannerImg from "../../assets/5_Blog_Layout_Best_Practices_From_2016-1.jpg";
const AllBlogs = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await axiosInstance.get("/articles/all-articles");
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && blogs?.data?.data?.length <= 0) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-black font-medium">
        No Blogs Found
      </div>
    );
  }
  return (
    <div>
      <img className="w-full h-screen" src={bannerImg} alt="banner" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-4/5 mx-auto ">
        {blogs?.data?.data?.map((blog) => (
          <ArticleCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;

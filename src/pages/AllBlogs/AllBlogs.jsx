import { useQuery } from "@tanstack/react-query";

import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Loader from "../../components/Loader/Loader";
import bannerImg from "../../assets/5_Blog_Layout_Best_Practices_From_2016-1.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils";
const AllBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

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
      <div className="flex justify-center items-center h-screen text-2xl text-black font-medium">
        No Blogs Found
      </div>
    );
  }
  const pages = blogs?.data?.meta?.totalPages;
  const pageArray = new Array(pages).fill(0);
  const firstArticle = blogs?.data?.data?.[0];

  return (
    <div>
      {/* latest article */}
      {firstArticle && (
        <div className="relative ">
          <img className="w-full h-screen" src={bannerImg} alt="banner" />
          <div className=" absolute bottom-1/9 bg-gray-950/10 rounded-lg  text-white  p-12  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Link
              to={`/category/${firstArticle?.category}`}
              className="mx-auto"
            >
              <p className="capitalize bg-red-600 text-white font-medium p-1 w-48 mx-auto rounded-sm hover:bg-gray-700 transition-all">
                {firstArticle?.category}
              </p>
            </Link>
            <Link to={`/blog/${firstArticle?._id}`}>
              <h2 className="text-4xl  font-extrabold capitalize">
                {firstArticle.title}
              </h2>
            </Link>
          </div>
        </div>
      )}
      <div className="text-center">
        <h2 className="text-2xl font-medium text-black pt-6">
          Latest Articles
        </h2>
        <p className="mt-4 text-gray-600 text-lg pb-8">
          Check out the latest blog posts from our community.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-4/5 mx-auto ">
        {blogs?.data?.data?.map((blog) => (
          <ArticleCard key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="join flex justify-center items-center mt-6 mb-12">
        {pages > 1 &&
          pageArray?.map((_, page) => (
            <button
              onClick={() => setCurrentPage(page + 1)}
              key={page}
              className={`join-item btn ${
                currentPage === page + 1 ? "bg-blue-400 text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default AllBlogs;

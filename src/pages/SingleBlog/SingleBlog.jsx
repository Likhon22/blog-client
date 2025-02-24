import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils";
import SingleArticleCard from "../../components/SingleArticleCard/SingleArticleCard";

const SingleBlog = () => {
  const { id } = useParams();
  console.log(id);

  const { data: blog } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/articles/single-article/${id}`);
      return res.data;
    },
  });

  console.log(blog);

  return <div>{blog && <SingleArticleCard blog={blog.data} />}</div>;
};

export default SingleBlog;

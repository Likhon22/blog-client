import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FaImage } from "react-icons/fa";
import TextEditor from "../../components/TextEditor/TextEditor";
import { axiosInstance } from "../../utils";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

function EditSingleArticle() {
  const { id } = useParams();
  const [value, setValue] = useState("");

  // Fetch article data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles/single-article/${id}`
      );
      return response.data;
    },
  });
  useEffect(() => {
    if (data?.data?.post) {
      setValue(data.data.post);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load article.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value.toLowerCase();

    const articleInfo = { title, category, post: value };
    console.log(articleInfo);

    try {
      const result = await axiosInstance.put(
        `/articles/update-article/${id}`,
        articleInfo
      );
      if (result.data.success) {
        toast.success("Article updated successfully");
      }
    } catch (err) {
      toast.error("Failed to update article");
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-16 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Article</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-600 font-medium">Title</label>
          <input
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            name="title"
            defaultValue={data?.data?.title}
            required
          />
        </div>

        {/* Category Input */}
        <div>
          <label className="block text-gray-600 font-medium">Category</label>
          <input
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            name="category"
            defaultValue={data?.data?.category}
            required
          />
        </div>

        {/* Text Editor */}
        <div>
          <TextEditor value={value} setValue={setValue} />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 cursor-pointer bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Update Article
          </button>
        </div>
      </form>

      {/* Image Upload Button (Commented) */}
      {/* 
      <div className="flex justify-center mt-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition">
          <FaImage /> Upload Image
        </button>
      </div>
      */}
    </div>
  );
}

export default EditSingleArticle;

import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FaEdit, FaNewspaper } from "react-icons/fa";
import TextEditor from "../../components/TextEditor/TextEditor";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { axiosInstance } from "../../utils";

function EditSingleArticle() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Set editor content when data is loaded
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

    // Form validation
    if (!e.target.title.value.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!e.target.category.value.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!value.trim()) {
      toast.error("Article content is required");
      return;
    }

    setIsSubmitting(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value.toLowerCase();

    const articleInfo = { title, category, post: value };

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Edit Article
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Update your article content and details
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center">
            <FaEdit className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Article #{id.substring(0, 8)}
            </h3>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Last updated:{" "}
            {new Date(
              data?.data?.updatedAt || data?.data?.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 mb-6">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  placeholder="Enter a compelling title for your article"
                  defaultValue={data?.data?.title}
                  required
                />
              </div>

              {/* Category Input */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  placeholder="Enter category"
                  defaultValue={data?.data?.category}
                  required
                />
              </div>

              {/* Article Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">
                    AUTHOR
                  </span>
                  <span className="text-sm font-semibold">
                    {data?.data?.author?.name || "Unknown"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">
                    CREATED
                  </span>
                  <span className="text-sm font-semibold">
                    {new Date(data?.data?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">
                    STATUS
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-green-800">
                    Published
                  </span>
                </div>
              </div>

              {/* Text Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article Content
                </label>
                <div className="mt-1">
                  <TextEditor value={value} setValue={setValue} />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-between items-center">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Article"}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="mt-8 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 flex items-center">
          <FaNewspaper className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Preview</h3>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{data?.data?.title}</h2>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditSingleArticle;

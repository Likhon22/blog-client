import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FaEdit, FaNewspaper, FaStar } from "react-icons/fa";
import TextEditor from "../../components/TextEditor/TextEditor";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { axiosInstance } from "../../utils";

function EditSingleArticle() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const queryClient = useQueryClient();

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

  // Set editor content and featured state when data is loaded
  useEffect(() => {
    if (data?.data) {
      setValue(data.data.post || "");
      setIsFeatured(data.data.featured || false);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load article.</p>;

  // Separate function to handle featured toggle
  const handleFeaturedToggle = async () => {
    try {
      setIsSubmitting(true);
      const newFeaturedState = !isFeatured;

      const result = await axiosInstance.put(`/articles/update-article/${id}`, {
        featured: newFeaturedState,
      });

      if (result.data.success) {
        setIsFeatured(newFeaturedState);
        toast.success(
          newFeaturedState
            ? "Article set as featured! This will replace any previously featured article."
            : "Article removed from featured"
        );
        // Invalidate queries to refresh data
        queryClient.invalidateQueries("blogs");
      }
    } catch (err) {
      toast.error("Failed to update featured status");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

    const articleInfo = {
      title,
      category,
      post: value,
      featured: isFeatured, // Include featured status in the update
    };

    try {
      const result = await axiosInstance.put(
        `/articles/update-article/${id}`,
        articleInfo
      );
      if (result.data.success) {
        toast.success("Article updated successfully");
        // Invalidate queries to refresh data
        queryClient.invalidateQueries("blogs");
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

        {/* Featured Toggle Button - DaisyUI Version */}
        <div className="mt-4 md:mt-0">
          <div className="card compact bg-base-100 shadow-sm border border-base-200">
            <div className="card-body flex-row items-center gap-4">
              <div className={`avatar ${isFeatured ? "online" : "offline"}`}>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <FaStar
                    className={`h-5 w-5 ${
                      isFeatured ? "text-amber-500" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Featured Article</h3>
              </div>
              <div className="ml-2">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isFeatured}
                    onChange={handleFeaturedToggle}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center">
            <FaEdit className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Article #{id.substring(0, 8)}
            </h3>
            {isFeatured && (
              <div className="badge badge-warning gap-1 ml-3">
                <FaStar className="w-3 h-3" /> Featured
              </div>
            )}
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
                  <span className="badge badge-success bg-green-100 text-green-800">
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
              className="btn btn-outline btn-sm"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary btn-sm ${
                isSubmitting ? "loading" : ""
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
          {/* Add styles for alignment classes */}
          <style>{`
  /* Text alignment styles */
  .prose .ql-align-center { text-align: center !important; }
  .prose .ql-align-right { text-align: right !important; }
  .prose .ql-align-justify { text-align: justify !important; }
  .prose .ql-align-left { text-align: left !important; }
  
  /* Indentation styles */
  .prose .ql-indent-1 { padding-left: 3em; }
  .prose .ql-indent-2 { padding-left: 6em; }
  .prose .ql-indent-3 { padding-left: 9em; }
  
  /* Image styles */
  .prose img { margin: 1.5em auto; display: block; max-width: 100%; height: auto; }
  
  /* Heading styles */
  .prose h1 { font-size: 2em; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  .prose h2 { font-size: 1.5em; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  .prose h3 { font-size: 1.17em; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  .prose h4 { font-size: 1em; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  .prose h5 { font-size: 0.83em; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  .prose h6 { font-size: 0.67em; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
  
  /* List styles */
  .prose ul, .prose ol { margin-left: 2em; margin-bottom: 1em; }
  .prose ul { list-style-type: disc; }
  .prose ol { list-style-type: decimal; }
  
  /* Blockquote styles */
  .prose blockquote { 
    border-left: 4px solid #e5e7eb; 
    padding-left: 1em; 
    margin-left: 0;
    margin-right: 0;
    color: #6b7280; 
  }
`}</style>
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

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
import { FaPlus, FaImage, FaNewspaper } from "react-icons/fa";
import TextEditor from "../../components/TextEditor/TextEditor";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { axiosInstance } from "../../utils";

function CreateArticle() {
  const [value, setValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!e.target.title.value.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!categoryValue) {
      toast.error("Please select a category");
      return;
    }

    if (!value.trim()) {
      toast.error("Article content is required");
      return;
    }

    setIsSubmitting(true);

    const form = e.target;
    const title = form.title.value;
    const category = categoryValue;
    const authorEmail = user.email;
    const articleInfo = {
      title,
      category: category.toLowerCase().trim(),
      post: value,
      authorEmail,
    };

    try {
      const result = await axiosInstance.post(
        "/articles/create-article",
        articleInfo
      );

      if (result.data.success) {
        toast.success("Article created successfully");
        form.reset();
        setValue("");
        setCategoryValue("");
      }
    } catch (err) {
      toast.error(err.message || "Failed to create article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;

    if (!category.trim()) {
      toast.error("Category name is required");
      return;
    }

    const categoryInfo = { name: category.toLowerCase().trim() };

    try {
      const result = await axiosInstance.post(
        "/categories/create-category",
        categoryInfo
      );

      if (result.data.success) {
        refetch();
        toast.success("Category created successfully");
        form.reset();
        document.getElementById("my_modal_1").close();
      }
    } catch (err) {
      toast.error(err.message || "Failed to create category");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Create New Article
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Share your knowledge with the world
          </p>
        </div>

        <button
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FaPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Category
        </button>
      </div>

      {/* Category Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white rounded-lg shadow-xl">
          <h3 className="font-bold text-xl text-gray-900 mb-4">Add Category</h3>
          <form onSubmit={handleCategory}>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <input
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                type="text"
                name="category"
                id="category"
                placeholder="Enter category name"
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center">
            <FaNewspaper className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Article Details
            </h3>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Fill in the information below to create your article
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
                />
              </div>

              {/* Category Select */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={(e) => setCategoryValue(e.target.value)}
                  value={categoryValue}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map((category) => (
                    <option
                      key={category._id}
                      value={category.name}
                      className="capitalize"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload Button - Commented out but styled properly */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaImage className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Upload Image
                </button>
              </div> */}

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
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArticle;

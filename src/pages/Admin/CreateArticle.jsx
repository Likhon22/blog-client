import { useState } from "react";

import "react-quill/dist/quill.snow.css";
import { FaImage } from "react-icons/fa";
import TextEditor from "../../components/TextEditor/TextEditor";
import { axiosInstance } from "../../utils";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

function CreateArticle() {
  const [value, setValue] = useState("");
  const { user } = useAuth();
  console.log(user?.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const authorEmail = user.email;
    const articleInfo = {
      title,
      category: category.toLowerCase(),
      post: value,
      authorEmail,
    };
    try {
      const result = await axiosInstance.post(
        "/articles/create-article",
        articleInfo
      );
      console.log(result.data);
      if (result.data.success) {
        toast.success("Article created successfully");
        form.reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleImageUpload = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.click();

  //   input.onchange = (e) => {
  //     const file = e.target.files[0];
  //     console.log(file);
  //   };
  // };
  const handleCategory = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto my-24">
      <div className="flex justify-end mb-6">
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Category
        </button>
        <dialog id="my_modal_1" className="modal">
          <form className="modal-box">
            <h3 className="font-bold text-lg pb-2">Add Category</h3>
            <input
              className="border-2 border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-text"
              type="text"
              name="category"
              id="category"
              placeholder="Enter article category"
            />
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white mt-4">
              Submit
            </button>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn bg-red-500 text-white hover:bg-red-600">
                  Close
                </button>
              </form>
            </div>
          </form>
        </dialog>
      </div>
      <div className=" p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg border border-blue-300">
        {/* <div className="flex justify-center mb-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105">
          <FaImage /> Upload Image
        </button>
      </div> */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create Article
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="text-blue-700 font-semibold">Title</label>
            <input
              className="border-2 border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-text"
              type="text"
              name="title"
              id="title"
              placeholder="Enter article title"
            />
          </div>

          <div className="mb-4">
            <label className="text-blue-700 font-semibold">Category</label>
            <input
              className="border-2 z-10 border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-text"
              type="text"
              name="category"
              id="category"
              placeholder="Enter article category"
            />
          </div>

          <div>
            <TextEditor value={value} setValue={setValue} />
          </div>

          <div className="flex justify-center mt-6">
            <button className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105">
              Create Article
            </button>
          </div>
        </form>
        {/* <div className="flex justify-center mt-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105">
          <FaImage /> Upload Image
        </button>
      </div> */}
      </div>
    </div>
  );
}

export default CreateArticle;

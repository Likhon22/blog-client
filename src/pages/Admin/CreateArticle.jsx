import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importing default styling
import { FaImage } from "react-icons/fa"; // Image upload icon

function CreateArticle() {
  const [value, setValue] = useState("");

  // Module settings for the toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      [{ align: [] }], 
    ],
  };
  console.log(value);

  // Function for handling image upload
  const handleImageUpload = (position) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log(file);

      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   const base64Image = reader.result;
      //   const editor = document.querySelector(".ql-editor");
      //   const range = editor.getSelection();
      //   editor.insertEmbed(range.index, "image", base64Image);
      // };
      // reader.readAsDataURL(file);
    };
  };

  return (
    <div className="max-w-4xl  mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        {/* Upper Image Upload Button */}
        <button
          onClick={() => handleImageUpload("top")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <FaImage className="mr-2" /> Upload Image Above
        </button>
      </div>

      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        onChange={setValue}
        className="border rounded-lg p-4 shadow-md bg-white  mb-4 transition-all focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-center mt-4">
        {/* Lower Image Upload Button */}
        <button
          onClick={() => handleImageUpload("bottom")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <FaImage className="mr-2" /> Upload Image Below
        </button>
      </div>
    </div>
  );
}

export default CreateArticle;

/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
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
const TextEditor = ({ value, setValue }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      modules={modules}
      onChange={setValue}
      className="border-2 z-0 border-blue-300 rounded-lg shadow-md bg-white p-4 min-h-[300px] focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default TextEditor;

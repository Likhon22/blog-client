/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";

const TextEditor = ({ value, setValue, modules }) => {
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

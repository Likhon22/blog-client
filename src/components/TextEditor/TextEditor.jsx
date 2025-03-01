/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Enhanced editor configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

// Format options
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "blockquote",
  "code-block",
  "link",
];

/**
 * Rich text editor component using React-Quill
 * @param {string} value - The editor content
 * @param {Function} setValue - Function to update editor content
 * @param {string} placeholder - Optional placeholder text
 */
const TextEditor = ({
  value,
  setValue,
  placeholder = "Write your content here...",
}) => {
  return (
    <div className="text-editor-container">
      <style>{`
        .text-editor-container .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          border-bottom: none;
          background-color: #f8fafc;
        }
        .text-editor-container .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          border-top: none;
          min-height: 300px;
          font-size: 1rem;
          line-height: 1.5;
        }
        .text-editor-container .ql-editor {
          min-height: 300px;
        }
        .text-editor-container .ql-editor p {
          margin-bottom: 0.75rem;
        }
        .text-editor-container .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .text-editor-container .ql-snow .ql-tooltip {
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .text-editor-container .ql-snow.ql-toolbar button:hover,
        .text-editor-container .ql-snow .ql-toolbar button:hover {
          color: #4f46e5;
        }
        .text-editor-container .ql-snow.ql-toolbar button.ql-active,
        .text-editor-container .ql-snow .ql-toolbar button.ql-active {
          color: #4f46e5;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={setValue}
        placeholder={placeholder}
        className="shadow-sm bg-white transition-all duration-200 ease-in-out focus-within:shadow-md"
      />
    </div>
  );
};

export default TextEditor;

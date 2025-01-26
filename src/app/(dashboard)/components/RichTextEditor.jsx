import dynamic from "next/dynamic";
import React from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} theme="snow" />;
};

export default RichTextEditor;
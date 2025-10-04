"use client";

import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
  });

  // Initialize editor content and listen for changes
  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = value; // set initial content
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, value, onChange]);

  return <div ref={quillRef} />;
}

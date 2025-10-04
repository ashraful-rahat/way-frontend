"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none border rounded-lg p-2 min-h-[150px]",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    autofocus: false,
    injectCSS: true,
    immediatelyRender: false, // ✅ SSR fix
  });

  if (!editor) return null; // client-only render

  return <EditorContent editor={editor} />;
}

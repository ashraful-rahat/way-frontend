/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosInstance from "@/utils/axios";
import { Edit, Plus, Trash2, X, Eye, Calendar, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Available categories
  const categories = [
    "Real Estate",
    "Construction",
    "Interior Design",
    "Property Investment",
    "Home Tips",
    "Market Trends",
    "Legal Advice"
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  // -------------------------------
  // Fetch Blogs
  // -------------------------------
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<{ data: Blog[] }>("/blogs/admin/all");
      setBlogs(res.data.data);
    } catch (err) {
      console.error("[DEBUG] Fetch blogs error:", err);
      toast.error("Blogs load failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Open Drawer
  // -------------------------------
  const openAddDrawer = () => {
    setEditingBlog(null);
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setShortDescription(blog.shortDescription);
    setContent(blog.content);
    setAuthor(blog.author);
    setCategory(blog.category);
    setTagsInput(blog.tags.join(", "));
    setIsPublished(blog.isPublished);
    setImageFile(null);
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setContent("");
    setAuthor("");
    setCategory("");
    setTagsInput("");
    setIsPublished(false);
    setImageFile(null);
  };

  // -------------------------------
  // Delete Blog
  // -------------------------------
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/blogs/${id}`);
          toast.success("Blog deleted");
          fetchBlogs();
        } catch (err) {
          console.error("[DEBUG] Delete error:", err);
          toast.error("Delete failed");
        }
      }
    });
  };

  // -------------------------------
  // Toggle Blog Publish Status
  // -------------------------------
  const togglePublishStatus = async (id: string) => {
    try {
      await axiosInstance.patch(`/blogs/${id}/toggle-publish`);
      toast.success("Blog status updated");
      fetchBlogs();
    } catch (err) {
      console.error("[DEBUG] Toggle publish error:", err);
      toast.error("Status update failed");
    }
  };

  // -------------------------------
  // Submit Blog (Add/Edit)
  // -------------------------------
  const handleSubmit = async () => {
    if (!title || !shortDescription || !content || !author || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag)));
    formData.append("isPublished", isPublished ? "true" : "false");

    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingBlog) {
        await axiosInstance.patch(`/blogs/${editingBlog._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog updated successfully");
      } else {
        await axiosInstance.post("/blogs/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog created successfully");
      }
      setIsDrawerOpen(false);
      resetForm();
      fetchBlogs();
    } catch (err: any) {
      console.error("[DEBUG] Submit error:", err.response?.data || err.message);
      toast.error("Operation failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#A4CC36]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div
          className="rounded-2xl p-6 text-white shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "rgb(164,204,54)" }}
        >
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-white/90 mt-1">
              Create and manage your blog posts
            </p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Add Blog</span>
          </button>
        </div>

        {/* Blogs Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">Blog Post</th>
                <th className="p-4">Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {blogs.map((blog, i) => (
                <tr
                  key={blog._id}
                  className={`hover:bg-gray-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="p-4 font-medium flex items-center space-x-3">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold line-clamp-1">{blog.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {blog.shortDescription}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {blog.author}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublishStatus(blog._id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        blog.isPublished
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {blog.publishedAt ? (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    ) : (
                      "Not published"
                    )}
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button
                      onClick={() => openEditDrawer(blog)}
                      className="p-2 hover:bg-indigo-100 rounded-lg transition-colors duration-300"
                      title="Edit Blog"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-300"
                      title="Delete Blog"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Drawer Form */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsDrawerOpen(false)}
            ></div>

            <div className="relative w-full max-w-2xl bg-white shadow-2xl p-6 ml-auto flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={3}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)] resize-none"
                    placeholder="Brief description (max 200 characters)"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {shortDescription.length}/200 characters
                  </p>
                </div>

                {/* Full Content */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content *
                  </label>
                  <textarea
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)] resize-none"
                    placeholder="Blog content (HTML supported)"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                    placeholder="Author name"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate tags with commas
                  </p>
                </div>

                {/* Publish Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    id="publish"
                  />
                  <label htmlFor="publish" className="text-sm font-medium">
                    Publish immediately
                  </label>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Featured Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full text-sm border border-dashed rounded-lg px-3 py-2"
                  />
                  {imageFile && (
                    <Image
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  {editingBlog?.image && !imageFile && (
                    <Image
                      src={editingBlog.image}
                      alt="Current Image"
                      width={128}
                      height={128}
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-3 rounded-lg border hover:bg-gray-100 transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 rounded-lg text-white hover:opacity-90 transition-all duration-300 font-medium"
                  style={{ backgroundColor: "rgb(164,204,54)" }}
                >
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
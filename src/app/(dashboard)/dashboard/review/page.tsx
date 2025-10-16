"use client";

import TiptapEditor from "@/app/(main)/components/TiptapEditor";
import axiosInstance from "@/utils/axios";
import { Edit, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get<{ data: Review[] }>("/reviews");
      setReviews(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch reviews");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRating(5);
    setComment("");
    setImage(null);
    setImagePreview(null);
    setExistingImage(null);
  };

  const openAddDrawer = () => {
    setEditingReview(null);
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (review: Review) => {
    setEditingReview(review);
    setName(review.name);
    setEmail(review.email);
    setRating(review.rating);
    setComment(review.comment);
    setExistingImage(review.image || null);
    setImage(null);
    setImagePreview(null);
    setIsDrawerOpen(true);
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/reviews/${id}`);
          toast.success("Review deleted");
          fetchReviews();
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!name || !email || !comment)
      return toast.error("Please fill all fields");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    // new image
    if (image) formData.append("image", image);

    // existing image if editing
    if (editingReview && existingImage)
      formData.append("existingImage", existingImage);

    try {
      if (editingReview) {
        await axiosInstance.patch(`/reviews/${editingReview._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Review updated");
      } else {
        await axiosInstance.post("/reviews/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Review added");
      }

      setIsDrawerOpen(false);
      resetForm();
      fetchReviews();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Submit failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div
          className="rounded-2xl p-6 text-white shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "rgb(164,204,54)" }}
        >
          <div>
            <h1 className="text-3xl font-bold">Reviews</h1>
            <p className="text-white/90 mt-1">Manage all client reviews</p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Image</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">{review.name}</td>
                  <td className="p-4">{review.email}</td>
                  <td className="p-4">{review.rating}</td>
                  <td className="p-4 max-w-xs truncate">{review.comment}</td>
                  <td className="p-4">
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => openEditDrawer(review)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drawer/Form */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <div className="bg-white w-full md:w-2/5 h-full p-6 overflow-auto relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {editingReview ? "Edit Review" : "Add Review"}
              </h2>

              {/* Name */}
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />

              {/* Email */}
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />

              {/* Rating */}
              <label className="block mb-2 font-semibold">Rating</label>
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full mb-4 p-2 border rounded"
              />

              {/* Comment */}
              <label className="block mb-2 font-semibold">Comment</label>
              <TiptapEditor value={comment} onChange={setComment} />

              {/* Image */}
              <label className="block mb-2 font-semibold mt-4">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                className="mb-4"
              />
              <div className="flex gap-2">
                {existingImage && (
                  <div className="relative">
                    <Image
                      src={existingImage}
                      alt="existing"
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setExistingImage(null)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {imagePreview && (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              >
                {editingReview ? "Update Review" : "Add Review"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;

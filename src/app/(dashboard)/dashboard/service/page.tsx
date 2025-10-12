/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosInstance from "@/utils/axios";
import { Edit, Plus, Trash2, X, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  galleryImages?: string[];
  features: string[];
  isActive: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

const ServicePage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Available Lucide icons for dropdown
  const availableIcons = [
    "Building2", "Home", "Hammer", "Palette", "Scale", 
    "MapPin", "Users", "Award", "Star", "Heart",
    "Shield", "Rocket", "Lightbulb", "Wrench", "Brush"
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  // -------------------------------
  // Fetch Services
  // -------------------------------
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<{ data: Service[] }>("/services/admin/all");
      setServices(res.data.data);
    } catch (err) {
      console.error("[DEBUG] Fetch services error:", err);
      toast.error("Services load failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Open Drawer
  // -------------------------------
  const openAddDrawer = () => {
    setEditingService(null);
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setShortDescription(service.shortDescription);
    setDescription(service.description);
    setIcon(service.icon);
    setFeatures(service.features || []);
    setFeaturesInput((service.features || []).join(", "));
    setIsActive(service.isActive);
    setOrder(service.order);
    setMetaTitle(service.metaTitle || "");
    setMetaDescription(service.metaDescription || "");
    setImageFile(null);
    setGalleryFiles([]);
    setGalleryPreviews(service.galleryImages || []);
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setDescription("");
    setIcon("");
    setFeatures([]);
    setFeaturesInput("");
    setIsActive(true);
    setOrder(0);
    setMetaTitle("");
    setMetaDescription("");
    setImageFile(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
  };

  // -------------------------------
  // Gallery Multiple Images Handler
  // -------------------------------
  const handleGalleryChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setGalleryFiles((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  // -------------------------------
  // Delete Service
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
          await axiosInstance.delete(`/services/${id}`);
          toast.success("Service deleted");
          fetchServices();
        } catch (err) {
          console.error("[DEBUG] Delete error:", err);
          toast.error("Delete failed");
        }
      }
    });
  };

  // -------------------------------
  // Toggle Service Status
  // -------------------------------
  const toggleServiceStatus = async (id: string) => {
    try {
      await axiosInstance.patch(`/services/${id}/toggle-status`);
      toast.success("Service status updated");
      fetchServices();
    } catch (err) {
      console.error("[DEBUG] Toggle status error:", err);
      toast.error("Status update failed");
    }
  };

  // -------------------------------
  // Submit Service (Add/Edit)
  // -------------------------------
  const handleSubmit = async () => {
    if (!title || !shortDescription || !description || !icon) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("icon", icon);
    formData.append("isActive", isActive ? "true" : "false");
    formData.append("order", order.toString());

    // Convert featuresInput to array
    const featuresArray = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    formData.append("features", JSON.stringify(featuresArray));

    if (metaTitle) formData.append("metaTitle", metaTitle);
    if (metaDescription) formData.append("metaDescription", metaDescription);
    if (imageFile) formData.append("image", imageFile);
    galleryFiles.forEach((file) => formData.append("galleryImages", file));

    try {
      if (editingService) {
        await axiosInstance.patch(`/services/${editingService._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service updated successfully");
      } else {
        await axiosInstance.post("/services/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service created successfully");
      }
      setIsDrawerOpen(false);
      resetForm();
      fetchServices();
    } catch (err: any) {
      console.error("[DEBUG] Submit error:", err.response?.data || err.message);
      toast.error("Operation failed");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#A4CC36]"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div
          className="rounded-2xl p-6 text-white shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "rgb(164,204,54)" }}
        >
          <div>
            <h1 className="text-3xl font-bold">Service Management</h1>
            <p className="text-white/90 mt-1">
              Manage and organize your services portfolio
            </p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Add Service</span>
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Icon</th>
                <th className="p-4">Features</th>
                <th className="p-4">Status</th>
                <th className="p-4">Order</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.map((service, i) => (
                <tr
                  key={service._id}
                  className={`hover:bg-gray-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="p-4 font-medium flex items-center space-x-3">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200">
                        <Star className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{service.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {service.shortDescription}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 capitalize">
                    {service.icon}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {service.features?.length || 0} features
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleServiceStatus(service._id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        service.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {service.order}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button
                      onClick={() => openEditDrawer(service)}
                      className="p-2 hover:bg-indigo-100 rounded-lg transition-colors duration-300"
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-300"
                      title="Delete Service"
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
                  {editingService ? "Edit Service" : "Add New Service"}
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
                    Service Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                    placeholder="Enter service title"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={2}
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

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Description *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)] resize-none"
                    placeholder="Detailed description (HTML supported)"
                  />
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Icon *
                  </label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  >
                    <option value="">Select an Icon</option>
                    {availableIcons.map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                  {icon && (
                    <p className="text-xs text-gray-500 mt-1">
                      Selected: {icon}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                  {featuresInput && (
                    <p className="text-xs text-gray-500 mt-1">
                      Will be saved as array separated by comma
                    </p>
                  )}
                </div>

                {/* Order and Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={order}
                      onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      id="active"
                    />
                    <label htmlFor="active" className="text-sm font-medium">
                      Active Service
                    </label>
                  </div>
                </div>

                {/* SEO Fields */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">SEO Settings (Optional)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                        placeholder="Meta title for SEO"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Meta Description
                      </label>
                      <textarea
                        rows={2}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)] resize-none"
                        placeholder="Meta description for SEO"
                      />
                    </div>
                  </div>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Main Image *
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
                      alt="Main Preview"
                      width={128}
                      height={128}
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  {editingService?.image && !imageFile && (
                    <Image
                      src={editingService.image}
                      alt="Current Image"
                      width={128}
                      height={128}
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gallery Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleGalleryChange(e.target.files)}
                    className="w-full text-sm border border-dashed rounded-lg px-3 py-2"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {galleryPreviews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20">
                        <Image
                          src={src}
                          alt={`Gallery ${i}`}
                          fill
                          className="object-cover rounded-lg"
                          style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => {
                            setGalleryFiles((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                            setGalleryPreviews((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
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
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
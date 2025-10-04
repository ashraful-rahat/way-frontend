"use client";

import TiptapEditor from "@/app/(main)/components/TiptapEditor";
import axiosInstance from "@/utils/axios";
import { Edit, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export interface Property {
  _id: string;
  projectId: { _id: string; name: string }; // populated project
  name: string;
  type: "house" | "villa" | "office" | "penthouse";
  area?: number;
  rooms?: number;
  price: number;
  floor?: number;
  images?: string[];
  available: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  name: string;
}

const PropertyPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form states
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<"house" | "villa" | "office" | "penthouse">(
    "house"
  );
  const [area, setArea] = useState<number | "">("");
  const [rooms, setRooms] = useState<number | "">("");
  const [floor, setFloor] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // for editing

  useEffect(() => {
    fetchProperties();
    fetchProjects();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get<{ data: Property[] }>("/properties");
      setProperties(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch properties");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get<{ data: Project[] }>("/projects");
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects");
    }
  };

  const resetForm = () => {
    setProjectId("");
    setName("");
    setType("house");
    setArea("");
    setRooms("");
    setFloor("");
    setPrice("");
    setAvailable(true);
    setDescription("");
    setImages([]);
    setImagePreviews([]);
    setExistingImages([]);
  };

  const openAddDrawer = () => {
    setEditingProperty(null);
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (prop: Property) => {
    setEditingProperty(prop);
    setProjectId(prop.projectId._id);
    setName(prop.name);
    setType(prop.type);
    setArea(prop.area || "");
    setRooms(prop.rooms || "");
    setFloor(prop.floor || "");
    setPrice(prop.price);
    setAvailable(prop.available);
    setDescription(prop.description || "");
    setExistingImages(prop.images || []);
    setImages([]);
    setImagePreviews([]);
    setIsDrawerOpen(true);
  };

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteImage = (index: number, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
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
          await axiosInstance.delete(`/properties/${id}`);
          toast.success("Property deleted");
          fetchProperties();
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!projectId) return toast.error("Please select a project");

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("name", name);
    formData.append("type", type);
    if (area) formData.append("area", area.toString());
    if (rooms) formData.append("rooms", rooms.toString());
    if (floor) formData.append("floor", floor.toString());
    if (price) formData.append("price", price.toString());
    formData.append("available", available ? "true" : "false");
    formData.append("description", description);

    // append new images
    images.forEach((file) => formData.append("images", file));

    // append existing images if editing
    existingImages.forEach((url) => formData.append("existingImages", url));

    try {
      if (editingProperty) {
        await axiosInstance.patch(
          `/properties/${editingProperty._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Property updated");
      } else {
        await axiosInstance.post("/properties/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property added");
      }

      setIsDrawerOpen(false);
      resetForm();
      fetchProperties();
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
            <h1 className="text-3xl font-bold">Property Management</h1>
            <p className="text-white/90 mt-1">Manage all properties</p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Project</th>
                <th className="p-4">Type</th>
                <th className="p-4">Area</th>
                <th className="p-4">Rooms</th>
                <th className="p-4">Price</th>
                <th className="p-4">Available</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties.map((prop, i) => (
                <tr
                  key={prop._id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  } hover:bg-gray-50 transition`}
                >
                  <td className="p-4 font-medium flex items-center space-x-3">
                    {prop.images && prop.images.length > 0 ? (
                      <Image
                        src={prop.images[0]}
                        alt={prop.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200">
                        <span className="text-gray-500">
                          {prop.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span>{prop.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {prop.projectId?.name || "-"}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{prop.type}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {prop.area || "-"}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {prop.rooms || "-"}
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-800">
                    ${prop.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {prop.available ? "Yes" : "No"}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openEditDrawer(prop)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(prop._id)}
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
                {editingProperty ? "Edit Property" : "Add Property"}
              </h2>

              {/* Project */}
              <label className="block mb-2 font-semibold">Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="">Select project</option>
                {projects.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.name}
                  </option>
                ))}
              </select>

              {/* Name */}
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />

              {/* Type */}
              <label className="block mb-2 font-semibold">Type</label>
              <select
                value={type}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => setType(e.target.value as any)}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="penthouse">Penthouse</option>
              </select>

              {/* Other Fields */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-semibold">Area</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Rooms</label>
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Floor</label>
                  <input
                    type="number"
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Available */}
              <label className="block mb-2 font-semibold">Available</label>
              <select
                value={available ? "true" : "false"}
                onChange={(e) => setAvailable(e.target.value === "true")}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              {/* Description */}
              <label className="block mb-2 font-semibold">Description</label>
              <TiptapEditor value={description} onChange={setDescription} />

              {/* Images */}
              <label className="block mb-2 font-semibold mt-4">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files)}
                className="mb-4"
              />
              <div className="flex flex-wrap gap-2">
                {existingImages.map((url, i) => (
                  <div key={i} className="relative">
                    <Image
                      src={url}
                      alt="existing"
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleDeleteImage(i, true)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {imagePreviews.map((url, i) => (
                  <div key={i} className="relative">
                    <Image
                      src={url}
                      alt="new"
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleDeleteImage(i, false)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              >
                {editingProperty ? "Update Property" : "Add Property"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;

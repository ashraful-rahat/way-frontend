"use client";

import axiosInstance from "@/utils/axios";
import { DollarSign, Edit, ImageIcon, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// -------------------- Interfaces --------------------
export interface Flat {
  _id: string;
  projectId: string;
  name: string;
  type: string;
  area: number;
  rooms: number;
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

// -------------------- TiptapEditor Component --------------------
interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: { class: "prose focus:outline-none" },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    autofocus: false,
    injectCSS: true,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className="border rounded-lg p-2 min-h-[150px]"
    />
  );
}

// -------------------- FlatPage --------------------
const FlatPage = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingFlat, setEditingFlat] = useState<Flat | null>(null);

  // Form states
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState<number | "">("");
  const [rooms, setRooms] = useState<number | "">("");
  const [floor, setFloor] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchFlats();
    fetchProjects();
  }, []);

  const fetchFlats = async () => {
    try {
      const res = await axiosInstance.get<{ data: Flat[] }>("/flats");
      setFlats(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch flats");
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

  const openAddDrawer = () => {
    setEditingFlat(null);
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (flat: Flat) => {
    setEditingFlat(flat);
    setProjectId(flat.projectId);
    setName(flat.name);
    setType(flat.type);
    setArea(flat.area);
    setRooms(flat.rooms);
    setFloor(flat.floor || "");
    setPrice(flat.price);
    setAvailable(flat.available);
    setDescription(flat.description || "");
    setImagePreviews(flat.images || []);
    setImages([]);
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setProjectId("");
    setName("");
    setType("");
    setArea("");
    setRooms("");
    setFloor("");
    setPrice("");
    setAvailable(true);
    setDescription("");
    setImages([]);
    setImagePreviews([]);
  };

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
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
          await axiosInstance.delete(`/flats/${id}`);
          toast.success("Flat deleted");
          fetchFlats();
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
    formData.append("area", area.toString());
    formData.append("rooms", rooms.toString());
    if (floor) formData.append("floor", floor.toString());
    formData.append("price", price.toString());
    formData.append("available", available ? "true" : "false");
    formData.append("description", description);

    images.forEach((file) => formData.append("images", file));

    try {
      if (editingFlat) {
        await axiosInstance.patch(`/flats/${editingFlat._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Flat updated");
      } else {
        await axiosInstance.post("/flats/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Flat added");
      }
      setIsDrawerOpen(false);
      resetForm();
      fetchFlats();
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
            <h1 className="text-3xl font-bold">Flats Management</h1>
            <p className="text-white/90 mt-1">Manage flats with full CRUD</p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" /> <span>Add Flat</span>
          </button>
        </div>

        {/* Flats Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">Flat</th>
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
              {flats.map((flat, i) => {
                const projectName =
                  projects.find((p) => p._id === flat.projectId)?.name ||
                  "Unknown";
                return (
                  <tr
                    key={flat._id}
                    className={`hover:bg-gray-50 transition ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="p-4 font-medium flex items-center space-x-3">
                      {flat.images && flat.images.length > 0 ? (
                        <Image
                          src={flat.images[0]}
                          alt={flat.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200">
                          <ImageIcon className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                      <span>{flat.name}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{projectName}</td>
                    <td className="p-4 text-sm text-gray-600">{flat.type}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {flat.area} sq.ft
                    </td>
                    <td className="p-4 text-sm text-gray-600">{flat.rooms}</td>
                    <td className="p-4 text-sm font-semibold text-gray-800 flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-green-600" />{" "}
                      <span>{flat.price.toLocaleString()}</span>
                    </td>
                    <td className="p-4 text-sm">
                      {flat.available ? (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="p-4 flex justify-end space-x-2">
                      <button
                        onClick={() => openEditDrawer(flat)}
                        className="p-2 hover:bg-indigo-100 rounded-lg"
                      >
                        <Edit className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(flat._id)}
                        className="p-2 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Drawer Form */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="relative w-full max-w-md bg-white shadow-2xl p-6 ml-auto flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingFlat ? "Edit Flat" : "Add New Flat"}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {/* Project Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  >
                    <option value="">Select Project</option>
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Flat Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Flat Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  />
                </div>

                {/* Type & Area */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="e.g., 2BHK"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Area (sq.ft)
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {/* Rooms & Floor */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rooms
                    </label>
                    <input
                      type="number"
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Floor
                    </label>
                    <input
                      type="number"
                      value={floor}
                      onChange={(e) => setFloor(Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Description with Tiptap */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <TiptapEditor value={description} onChange={setDescription} />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files)}
                    className="w-full text-sm border border-dashed rounded-lg px-3 py-2"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20">
                        <Image
                          src={src}
                          alt={`image ${i}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => {
                            setImages((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                            setImagePreviews((prev) =>
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

                {/* Available */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                  />
                  <label className="text-sm font-medium">Available</label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 rounded-lg text-white hover:opacity-90"
                  style={{ backgroundColor: "rgb(164,204,54)" }}
                >
                  {editingFlat ? "Update Flat" : "Add Flat"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlatPage;

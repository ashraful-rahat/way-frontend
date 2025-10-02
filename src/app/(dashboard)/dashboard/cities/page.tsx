"use client";

import axiosInstance from "@/utils/axios";
import { Building2, Edit, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export interface City {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const CityPage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<{ data: City[] }>("/cities");
      console.log("[DEBUG] Fetched cities:", res.data.data);
      setCities(res.data.data);
    } catch (err) {
      console.error("[DEBUG] Fetch cities error:", err);
      toast.error("Cities load failed");
    } finally {
      setLoading(false);
    }
  };

  const openAddDrawer = () => {
    setEditingCity(null);
    setName("");
    setDescription("");
    setImageFile(null);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (city: City) => {
    setEditingCity(city);
    setName(city.name);
    setDescription(city.description || "");
    setImageFile(null); // optional: user can change image
    setIsDrawerOpen(true);
  };

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
          await axiosInstance.delete(`/cities/${id}`);
          toast.success("City deleted");
          fetchCities();
        } catch (err) {
          console.error("[DEBUG] Delete error:", err);
          toast.error("Delete failed");
        }
      }
    });
  };

  // -------------------------------
  // Create City
  // -------------------------------
  const createCity = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    console.log("📤 [DEBUG] Creating city with data:", {
      name,
      description,
      imageFile,
    });

    try {
      const res = await axiosInstance.post("/cities/create", formData);
      console.log("✅ [DEBUG] Create response:", res.data);
      toast.success("City added");
      setIsDrawerOpen(false);
      fetchCities();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "❌ [DEBUG] Create error:",
        error.response?.data || error.message
      );
      toast.error("City create failed");
    }
  };

  // -------------------------------
  // Update City
  // -------------------------------
  const updateCity = async () => {
    if (!editingCity) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    console.log("[DEBUG] Updating city:", editingCity._id, {
      name,
      description,
      imageFile,
    });

    try {
      const res = await axiosInstance.patch(
        `/cities/${editingCity._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("[DEBUG] Update response:", res.data);
      toast.success("City updated");
      setIsDrawerOpen(false);
      fetchCities();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "[DEBUG] Update error:",
        error.response?.data || error.message
      );
      toast.error("City update failed");
    }
  };

  const handleSubmit = async () => {
    if (editingCity) {
      await updateCity();
    } else {
      await createCity();
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
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
            <h1 className="text-3xl font-bold">City Management</h1>
            <p className="text-white/90 mt-1">
              Manage and explore cities in a modern dashboard
            </p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add City</span>
          </button>
        </div>

        {/* Cities Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">City</th>
                <th className="p-4">Description</th>
                <th className="p-4">Created</th>
                <th className="p-4">Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cities.map((city, i) => (
                <tr
                  key={city._id}
                  className={`hover:bg-gray-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="p-4 font-medium flex items-center space-x-3">
                    {city.image ? (
                      <Image
                        src={city.image}
                        alt={city.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200">
                        <Building2 className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    <span>{city.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {city.description}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(city.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(city.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button
                      onClick={() => openEditDrawer(city)}
                      className="p-2 hover:bg-indigo-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(city._id)}
                      className="p-2 hover:bg-red-100 rounded-lg"
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

            <div className="relative w-full max-w-md bg-white shadow-2xl p-6 ml-auto flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingCity ? "Edit City" : "Add New City"}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    City Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    City Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full text-sm border border-dashed rounded-lg px-3 py-2"
                  />
                </div>
              </div>

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
                  {editingCity ? "Update City" : "Add City"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityPage;

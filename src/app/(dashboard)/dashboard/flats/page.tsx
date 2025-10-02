"use client";

import { DollarSign, Edit, ImageIcon, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
// Removed mongoose import as it's not available in the client
import Image from "next/image";

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
  createdAt: Date;
  updatedAt: Date;
}

const FlatPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingFlat, setEditingFlat] = useState<Flat | null>(null);

  // Mock data (shape matches backend)
  const flats: Flat[] = [
    {
      _id: "1",
      projectId: "project1",
      name: "Flat A1",
      type: "3BHK",
      area: 1200,
      rooms: 3,
      price: 150000,
      floor: 5,
      images: ["/flat1.jpg"],
      available: true,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-05"),
    },
    {
      _id: "2",
      projectId: "project2",
      name: "Flat B2",
      type: "2BHK",
      area: 950,
      rooms: 2,
      price: 90000,
      floor: 3,
      images: [],
      available: false,
      createdAt: new Date("2025-01-02"),
      updatedAt: new Date("2025-01-06"),
    },
  ];

  const openAddDrawer = () => {
    setEditingFlat(null);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (flat: Flat) => {
    setEditingFlat(flat);
    setIsDrawerOpen(true);
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
            <p className="text-white/90 mt-1">
              Manage and explore available flats for your projects
            </p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Flat</span>
          </button>
        </div>

        {/* Flats Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">Flat</th>
                <th className="p-4">Type</th>
                <th className="p-4">Area</th>
                <th className="p-4">Rooms</th>
                <th className="p-4">Price</th>
                <th className="p-4">Available</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {flats.map((flat, i) => (
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
                  <td className="p-4 text-sm text-gray-600">{flat.type}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {flat.area} sq.ft
                  </td>
                  <td className="p-4 text-sm text-gray-600">{flat.rooms}</td>
                  <td className="p-4 text-sm font-semibold text-gray-800 flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
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
                  <td className="p-4 text-sm text-gray-500">
                    {flat.createdAt.toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button
                      onClick={() => openEditDrawer(flat)}
                      className="p-2 hover:bg-indigo-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drawer Form */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsDrawerOpen(false)}
            ></div>

            {/* Drawer */}
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
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Flat Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingFlat?.name || ""}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      defaultValue={editingFlat?.type || ""}
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
                      defaultValue={editingFlat?.area || ""}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rooms
                    </label>
                    <input
                      type="number"
                      defaultValue={editingFlat?.rooms || ""}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Floor
                    </label>
                    <input
                      type="number"
                      defaultValue={editingFlat?.floor || ""}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    defaultValue={editingFlat?.price || ""}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-sm border border-dashed rounded-lg px-3 py-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={editingFlat?.available || false}
                    className="w-4 h-4 text-[rgb(164,204,54)] border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium">Available</label>
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

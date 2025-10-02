"use client";

import axiosInstance from "@/utils/axios";
import { Edit, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export interface Employee {
  _id: string;
  serialNumber: number;
  name: string;
  role: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeamPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Form state
  const [serialNumber, setSerialNumber] = useState<number>(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  // -------------------------------
  // Fetch Employees
  // -------------------------------
  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get<{ data: Employee[] }>("/employees");
      setEmployees(res.data.data);
    } catch (err) {
      console.error("[DEBUG] Fetch employees error:", err);
      toast.error("Failed to load employees");
    }
  };

  // -------------------------------
  // Drawer Handlers
  // -------------------------------
  const openAddDrawer = () => {
    resetForm();
    setEditingEmployee(null);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (emp: Employee) => {
    setEditingEmployee(emp);
    setSerialNumber(emp.serialNumber);
    setName(emp.name);
    setRole(emp.role);
    setDescription(emp.description || "");
    setImagePreview(emp.image || "");
    setImageFile(null);
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setSerialNumber(0);
    setName("");
    setRole("");
    setDescription("");
    setImageFile(null);
    setImagePreview("");
  };

  // -------------------------------
  // Delete Employee
  // -------------------------------
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/employees/${id}`);
          toast.success("Employee deleted");
          fetchEmployees();
        } catch (err) {
          console.error("[DEBUG] Delete error:", err);
          toast.error("Delete failed");
        }
      }
    });
  };

  // -------------------------------
  // Submit Employee (Add/Edit)
  // -------------------------------
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("serialNumber", serialNumber.toString());
    formData.append("name", name);
    formData.append("role", role);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingEmployee) {
        await axiosInstance.patch(
          `/employees/${editingEmployee._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Employee updated");
      } else {
        await axiosInstance.post("/employees/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Employee added");
      }
      setIsDrawerOpen(false);
      resetForm();
      fetchEmployees();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("[DEBUG] Submit error:", err.response?.data || err.message);
      toast.error("Submit failed");
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
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-white/90 mt-1">
              Manage and view all employees and roles
            </p>
          </div>
          <button
            onClick={openAddDrawer}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Role</th>
                <th className="p-4">Description</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.map((emp, i) => (
                <tr
                  key={emp._id}
                  className={`hover:bg-gray-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="p-4 font-medium">{emp.serialNumber}</td>
                  <td className="p-4 font-medium flex items-center space-x-3">
                    {emp.image ? (
                      <Image
                        src={emp.image}
                        alt={emp.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                        {emp.name.charAt(0)}
                      </div>
                    )}
                    <span>{emp.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{emp.role}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {emp.description}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(emp.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button
                      onClick={() => openEditDrawer(emp)}
                      className="p-2 hover:bg-indigo-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
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

        {/* Drawer Form */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsDrawerOpen(false)}
            ></div>

            <div className="relative w-full max-w-md bg-white shadow-2xl p-6 ml-auto flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {/* Serial Number */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Serial Number
                  </label>
                  <input
                    type="number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(164,204,54)]"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    value={role}
                    placeholder="CEO, MD, Director"
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImageFile(e.target.files[0]);
                        setImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="w-full text-sm border border-dashed rounded-lg px-3 py-2"
                  />
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="mt-2 rounded-full object-cover"
                    />
                  )}
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
                  {editingEmployee ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;

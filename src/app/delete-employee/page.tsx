// app/delete-employee/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DeleteEmployeePage() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch employee details before delete
  const BASE_URL = "https://ems-background-production.up.railway.app/employees";

// Fetch employee by ID
const fetchEmployee = async () => {
  try {
    const res = await fetch(`${BASE_URL}/employees/${employeeId}`);
    if (res.ok) {
      const data = await res.json();
      setEmployeeData(data);
      setMessage("");
    } else {
      setEmployeeData(null);
      setMessage("⚠️ No employee found with this ID.");
    }
  } catch (error) {
    setMessage("❌ Server error while fetching employee.");
  }
};

// Delete employee
const handleDelete = async () => {
  try {
    const res = await fetch(`${BASE_URL}/employees/${employeeId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessage("✅ Employee deleted successfully!");
      setEmployeeData(null);
      setEmployeeId("");
    } else {
      setMessage("❌ Failed to delete employee.");
    }
    setShowConfirm(false);
  } catch (error) {
    setMessage("⚠️ Server error while deleting employee.");
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 p-8">
      {/* Outer Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Delete Employee
        </h1>

        {/* Search Employee */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Find Employee</h2>
          <div className="flex gap-3">
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
            <button
              onClick={fetchEmployee}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Show Employee Details */}
        {employeeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 mt-6 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>ID:</strong> {employeeData.id}</p>
              <p><strong>Name:</strong> {employeeData.full_name}</p>
              <p><strong>Email:</strong> {employeeData.email}</p>
              <p><strong>Phone:</strong> {employeeData.phone}</p>
              <p><strong>Department:</strong> {employeeData.department}</p>
              <p><strong>Role:</strong> {employeeData.role}</p>
            </div>

            {/* Delete Button */}
            <div className="text-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition"
                onClick={() => setShowConfirm(true)}
              >
                Delete Employee
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Confirm Modal */}
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md"
            >
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete{" "}
                <span className="text-red-600">{employeeData.full_name}</span>?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Messages */}
        {message && (
          <p className="text-center mt-6 text-lg font-medium text-green-600">
            {message}
          </p>
        )}
      </motion.div>
    </main>
  );
}

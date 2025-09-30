"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function UpdateEmployee() {
  const [searchValue, setSearchValue] = useState(""); // ID or Name
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [message, setMessage] = useState("");

  const BASE_URL = "https://ems-backend-cwlh.onrender.com";

// Fetch employee
const fetchEmployee = async () => {
  try {
    const res = await fetch(`${BASE_URL}/employees?query=${searchValue}`);
    if (!res.ok) throw new Error("Employee not found");

    const data = await res.json();
    if (data.length === 0) throw new Error("Employee not found");

    setEmployeeData(data[0]); // take first match
    setMessage("");
  } catch (error: any) {
    setMessage(error.message);
    setEmployeeData(null);
  }
};

// Update employee
const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!employeeData) return;

  try {
    const res = await fetch(`${BASE_URL}/employees/${employeeData.id}`, { // use 'id' from backend
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    if (res.ok) setMessage("✅ Employee updated successfully!");
    else setMessage("❌ Failed to update employee");
  } catch (err) {
    setMessage("❌ Error updating employee");
  }
};


  // Generic input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6 text-white">
      <motion.div
        className="w-full max-w-5xl bg-gray-700 rounded-2xl shadow-xl p-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Update Employee</h2>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter Employee ID or Name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchEmployee}
            className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Fetch
          </button>
        </div>

        {/* Employee Form */}
        {employeeData && (
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee Details */}
            <input name="employeeId" placeholder="Employee ID" value={employeeData.employeeId || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="fullName" placeholder="Full Name" value={employeeData.fullName || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="email" type="email" placeholder="Email" value={employeeData.email || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="phone" placeholder="Phone Number" value={employeeData.phone || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="dob" type="date" placeholder="DOB" value={employeeData.dob || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <select name="gender" value={employeeData.gender || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            {/* Job Details */}
            <input name="department" placeholder="Department" value={employeeData.department || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="role" placeholder="Role" value={employeeData.role || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="joiningDate" type="date" placeholder="Joining Date" value={employeeData.joiningDate || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="salary" type="number" placeholder="Salary" value={employeeData.salary || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <select name="employmentType" value={employeeData.employmentType || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white">
              <option value="">Employment Type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
            <input name="workLocation" placeholder="Work Location" value={employeeData.workLocation || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />

            {/* Emergency Contact */}
            <input name="emergencyName" placeholder="Emergency Name" value={employeeData.emergencyName || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="emergencyPhone" placeholder="Emergency Phone" value={employeeData.emergencyPhone || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="emergencyEmail" placeholder="Emergency Email" value={employeeData.emergencyEmail || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />
            <input name="emergencyRelation" placeholder="Emergency Relation" value={employeeData.emergencyRelation || ""} onChange={handleChange} className="px-4 py-2 rounded-lg text-black bg-white" />

            <button type="submit" className="col-span-2 mt-4 px-5 py-3 bg-green-600 rounded-lg hover:bg-green-700">
              Update Employee
            </button>
          </form>
        )}

        {message && <p className="mt-6 text-center font-semibold text-lg">{message}</p>}
      </motion.div>
    </div>
  );
}

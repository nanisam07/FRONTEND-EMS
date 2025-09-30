"use client";

import { useState, useEffect } from "react";
import { Poppins, Inter } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    department: "",
    role: "",
    joiningDate: "",
    salary: "",
    employmentType: "",
    workLocation: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyEmail: "",
    emergencyRelation: "",
  });

  const BASE_URL = "https://ems-background-production.up.railway.app";
  const [employeeCount, setEmployeeCount] = useState(0);

  // Fetch total employees
  const fetchEmployeeCount = async () => {
    try {
      const res = await fetch(`${BASE_URL}/employees`);
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployeeCount(data.length || 0);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployeeCount(0);
    }
  };

  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new employee
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("✅ Employee added successfully!");
        setEmployee({
          employeeId: "",
          fullName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          department: "",
          role: "",
          joiningDate: "",
          salary: "",
          employmentType: "",
          workLocation: "",
          emergencyName: "",
          emergencyPhone: "",
          emergencyEmail: "",
          emergencyRelation: "",
        });
        fetchEmployeeCount(); // Refresh count immediately
      } else {
        alert("❌ Failed to add employee.");
      }
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 p-6">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 drop-shadow-md">
        👤 Add Employee
      </h1>

      <p className="text-lg font-semibold text-gray-700 mb-8">
        Total Employees: <span className="text-purple-600">{employeeCount}</span>
      </p>

      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employee Info */}
        <div className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Employee Info</h2>
          <input name="employeeId" value={employee.employeeId} onChange={handleChange} type="text" placeholder="Employee ID" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          <input name="fullName" value={employee.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          <input name="email" value={employee.email} onChange={handleChange} type="email" placeholder="Email" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          <input name="phone" value={employee.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          <input name="dob" value={employee.dob} onChange={handleChange} type="date" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
          <select name="gender" value={employee.gender} onChange={handleChange} className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Job Details */}
        <div className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">Job Details</h2>
          <input name="department" value={employee.department} onChange={handleChange} type="text" placeholder="Department" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input name="role" value={employee.role} onChange={handleChange} type="text" placeholder="Role" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input name="joiningDate" value={employee.joiningDate} onChange={handleChange} type="date" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input name="salary" value={employee.salary} onChange={handleChange} type="number" placeholder="Salary" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <select name="employmentType" value={employee.employmentType} onChange={handleChange} className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400">
            <option value="">Employment Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Intern</option>
          </select>
          <input name="workLocation" value={employee.workLocation} onChange={handleChange} type="text" placeholder="Work Location" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Emergency Contact */}
        <div className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Emergency Contact</h2>
          <input name="emergencyName" value={employee.emergencyName} onChange={handleChange} type="text" placeholder="Contact Full Name" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input name="emergencyPhone" value={employee.emergencyPhone} onChange={handleChange} type="tel" placeholder="Contact Phone Number" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input name="emergencyEmail" value={employee.emergencyEmail} onChange={handleChange} type="email" placeholder="Contact Email" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input name="emergencyRelation" value={employee.emergencyRelation} onChange={handleChange} type="text" placeholder="Relationship" className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      <button onClick={handleSubmit} className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300">
        ➕ Add Employee
      </button>
    </div>
  );
}

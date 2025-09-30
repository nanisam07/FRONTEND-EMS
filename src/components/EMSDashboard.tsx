"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Employee {
  id: number;
  full_name: string;
  role: string;
  department: string;
  email: string;
  status: string;
}

export default function EMSDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");

  // Form state
  const [newEmployee, setNewEmployee] = useState({
    full_name: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
  });

  // Fetch all employees
  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle add employee
  const handleAddEmployee = async () => {
    try {
      const response = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        alert("✅ Employee added successfully!");
        setNewEmployee({
          full_name: "",
          email: "",
          role: "",
          department: "",
          status: "Active",
        });
        fetchEmployees(); // Refetch employees to update table & stats
      } else {
        alert("❌ Failed to add employee.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error adding employee.");
    }
  };

  // Compute stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const uniqueDepartments = [...new Set(employees.map((e) => e.department))].length;

  // Filter employees for search
  const filteredEmployees = employees.filter(
    (e) =>
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-serif p-6">
      <header className="w-full flex justify-between items-center px-8 py-4 bg-black text-white shadow-md">
        <h1 className="text-2xl font-bold">Staff Pro – EMS</h1>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <motion.div className="px-5 py-6 bg-white rounded-xl shadow-md text-center border">
          <p className="text-xl font-bold text-black">{totalEmployees}</p>
          <p className="text-gray-600">Total Employees</p>
        </motion.div>
        <motion.div className="px-5 py-6 bg-white rounded-xl shadow-md text-center border">
          <p className="text-xl font-bold text-black">{activeEmployees}</p>
          <p className="text-gray-600">Active</p>
        </motion.div>
        <motion.div className="px-5 py-6 bg-white rounded-xl shadow-md text-center border">
          <p className="text-xl font-bold text-black">{uniqueDepartments}</p>
          <p className="text-gray-600">Departments</p>
        </motion.div>
      </div>

      {/* Add Employee Form */}
      <div className="mt-8 bg-gray-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={newEmployee.full_name}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newEmployee.role}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newEmployee.department}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg"
          />
          <select
            name="status"
            value={newEmployee.status}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          onClick={handleAddEmployee}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition"
        >
          ➕ Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search by name, role, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
      </div>

      {/* Table */}
      {viewMode === "table" && (
        <table className="w-full text-left bg-white rounded-lg shadow">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-200 transition">
                <td className="p-2">{emp.full_name}</td>
                <td className="p-2">{emp.role}</td>
                <td
                  className={`p-2 ${
                    emp.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {emp.status}
                </td>
                <td className="p-2">{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

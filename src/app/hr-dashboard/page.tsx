"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EMSDashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table | grid
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);



const BASE_URL = "https://ems-background-production.up.railway.app/employees";

useEffect(() => {
  fetch(`${BASE_URL}/employees`)
    .then((res) => res.json())
    .then((data) => {
      setEmployees(data);
      setFilteredEmployees(data);
    })
    .catch((err) => console.error("Error fetching employees:", err));
}, []);

  // Search logic by ID or Name
  const handleSearch = () => {
    if (!search) {
      setFilteredEmployees(employees);
      return;
    }
    const filtered = employees.filter(
      (emp) =>
        emp.employee_id?.toString().includes(search) ||
        emp.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Quick filter click handler
  const handleQuickFilter = (filter: string) => {
    if (filter === "All") {
      setFilteredEmployees(employees);
    } else if (filter === "Active") {
      setFilteredEmployees(employees.filter((e) => e.status === "Active"));
    } else if (filter === "Engineering" || filter === "Design") {
      setFilteredEmployees(employees.filter((e) => e.department === filter));
    }
    setSearch(filter);
  };

  const buttons = [
    { label: "Add Employee", route: "/add-employee" },
    { label: "Delete Employee", route: "/delete-employee" },
    { label: "Update Employee", route: "/update-employee" },
  ];

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const uniqueDepartments = [...new Set(employees.map((e) => e.department))].length;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-serif">
      {/* Header */}
      <header className="w-full flex justify-center items-center px-8 py-4 bg-black text-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Staff Pro – EMS</h1>
      </header>

      <main className="flex-1 flex flex-col items-center p-8">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-black"
        >
          Welcome back <span className="text-red-600">HR </span>
        </motion.h2>
        <p className="mt-2 text-gray-600">Search, filter and review employees easily</p>

        {/* Action Buttons + Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {buttons.map((btn, i) => (
            <motion.button
              key={btn.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="px-5 py-3 bg-black text-white rounded-xl shadow-md hover:bg-red-500 transition"
              onClick={() => router.push(btn.route)}
            >
              {btn.label}
            </motion.button>
          ))}

          {[{ label: "Total Employees", value: totalEmployees },
            { label: "Active", value: activeEmployees },
            { label: "Departments", value: uniqueDepartments }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 3) * 0.1 }}
              className="px-5 py-6 bg-white rounded-xl shadow-md text-center border"
            >
              <p className="text-xl font-bold text-black">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 w-full max-w-4xl bg-gray-100 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Search Employees</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-black"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-red-600 transition"
              onClick={handleSearch}
            >
              Search
            </motion.button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <p className="font-semibold mr-2">Quick Filters:</p>
            {["All", "It", "Active", "Design"].map((filter, i) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleQuickFilter(filter)}
                className="px-4 py-1 bg-white border border-gray-300 rounded-lg shadow hover:bg-black hover:text-white transition"
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Result Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-10 w-full max-w-4xl bg-gray-100 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            {viewMode === "table" ? (
              <table className="w-full text-left bg-white rounded-lg shadow">
                <thead className="border-b border-gray-300">
                  <tr className="text-black">
                    <th className="p-2">Name</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp, idx) => (
                    <tr key={idx} className="hover:bg-gray-200 transition">
                      <td className="p-2">{emp.full_name}</td>
                      <td className="p-2">{emp.role}</td>
                      <td className={`p-2 ${emp.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                        {emp.status}
                      </td>
                      <td className="p-2">{emp.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEmployees.map((emp, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{emp.name}</h3>
                        <p className="text-sm text-gray-600">{emp.role} • {emp.department}</p>
                        <p className="text-xs text-gray-500">{emp.email}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-lg font-medium ${emp.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                        {emp.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

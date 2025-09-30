"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  id: number;
  full_name: string;
  department: string;
}

interface Team {
  id: number;
  name: string;
  project: string;
  lead: {
    id: number;
    full_name: string;
  } | null;
}

export default function ManagerDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  const [project, setProject] = useState("");
  const [leadId, setLeadId] = useState<number | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const BASE_URL = "https://ems-background-production.up.railway.app/employees";

useEffect(() => {
  // Fetch employees
  axios
    .get<Employee[]>(`${BASE_URL}/employees`)
    .then((res) => setEmployees(res.data))
    .catch((err) => console.error("Error fetching employees:", err));

  // Fetch teams
  axios
    .get<Team[]>(`${BASE_URL}/teams`)
    .then((res) => setTeams(res.data))
    .catch((err) => console.error("Error fetching teams:", err));
}, []);

  const handleMemberToggle = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleCreateTeam = () => {
    if (!teamName || !project || !leadId) return;

    axios
      .post("http://127.0.0.1:5000/teams", {
        name: teamName,
        project,
        lead_id: leadId,
        member_ids: selectedMembers,
      })
      .then((res) => {
        alert((res.data as { message: string }).message);
        axios.get<Team[]>("http://127.0.0.1:5000/teams").then((res) => setTeams(res.data));
        setTeamName("");
        setProject("");
        setLeadId(null);
        setSelectedMembers([]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <div
        className={`transition-all duration-500 ${
          sidebarOpen ? "w-1/4 p-6" : "w-12 p-2"
        } bg-gradient-to-b from-purple-400 to-pink-300 shadow-lg rounded-r-3xl flex flex-col relative`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 right-[-12px] bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-purple-100 transition"
        >
          {sidebarOpen ? "<" : ">"}
        </button>

        {sidebarOpen && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white text-center drop-shadow-lg">
              Employees ({employees.length})
            </h2>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-white p-3 rounded-xl shadow-md hover:scale-105 transform transition cursor-pointer"
                >
                  <p className="font-semibold text-gray-800">{emp.full_name}</p>
                  <p className="text-sm text-gray-500">{emp.department}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-10 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-100 animate-gradientBackground rounded-3xl"></div>

        <h1 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-md relative">
          Manager-CEO Dashboard
        </h1>

        {/* Form a Team */}
        <div className="bg-white p-6 rounded-3xl shadow-lg animate-slideUp relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Form a Team</h2>

          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border p-3 rounded-xl mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Project Name"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="border p-3 rounded-xl mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={leadId || ""}
            onChange={(e) => setLeadId(Number(e.target.value))}
            className="border p-3 rounded-xl mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Team Lead</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name} ({emp.department})
              </option>
            ))}
          </select>

          <div className="mb-4">
            <p className="font-semibold mb-2 text-gray-700">Select Members:</p>
            <div className="flex flex-wrap gap-2">
              {employees.map((emp) => (
                <label
                  key={emp.id}
                  className={`border px-3 py-1 rounded-xl cursor-pointer transition transform hover:scale-105 ${
                    selectedMembers.includes(emp.id)
                      ? "bg-purple-200 border-purple-400"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedMembers.includes(emp.id)}
                    onChange={() => handleMemberToggle(emp.id)}
                  />
                  {emp.full_name}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateTeam}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Create Team
          </button>
        </div>

        {/* Teams Formed */}
        <div className="bg-white p-6 rounded-3xl shadow-lg animate-slideUp delay-150 relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Teams Formed</h2>
          {teams.length === 0 ? (
            <p className="text-gray-500">No teams formed yet.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border px-4 py-2">Team Name</th>
                  <th className="border px-4 py-2">Project</th>
                  <th className="border px-4 py-2">Team Lead</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id} className="hover:bg-purple-50 transition">
                    <td className="border px-4 py-2">{team.name}</td>
                    <td className="border px-4 py-2">{team.project}</td>
                    <td className="border px-4 py-2">{team.lead?.full_name || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-gradientBackground {
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

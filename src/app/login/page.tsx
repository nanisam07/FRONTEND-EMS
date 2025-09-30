"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("https://ems-backend-cwlh.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.role === "hr") {
          router.push("/hr-dashboard");
        } else {
          router.push("/manager-ceo-dashboard");
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center relative overflow-hidden">
      {/* Cartoon background shapes */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -top-32 -left-32"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -bottom-32 -right-24"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center"
      >
        {/* User Avatar */}
        <motion.img
          src="/images/cartoon.jpg"
          alt="User"
          className="w-24 h-24 rounded-full mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Welcome Back!
        </h1>

        <form onSubmit={handleLogin} className="space-y-5 w-full">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-black placeholder-gray-400 shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-gray-700 font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-black placeholder-gray-400 shadow-sm"
              required
            />
            <span
              className="absolute right-4 top-11 cursor-pointer text-gray-500 select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold shadow-md transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span className="text-pink-500 font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

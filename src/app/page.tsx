"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HomeSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center text-center px-4 font-serif bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ff9a9e,_transparent_50%),radial-gradient(circle_at_bottom_right,_#fad0c4,_transparent_50%)] animate-pulse"></div>

      {/* Top-right Login button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/login")}
        className="absolute top-8 right-8 px-6 py-2 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition z-10"
      >
        Login
      </motion.button>

      {/* Animated background floating shapes */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute w-[500px] h-[500px] bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -top-40 -left-40"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -bottom-40 -right-32"
      ></motion.div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Welcome to Staff Pro – EMS
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-8 drop-shadow-md">
          Manage your workforce efficiently with our Employee Management System.
          Track attendance, roles, and departments — all in one modern platform.
        </p>
        <motion.img
          src="/images/home.png"
          alt="Staff Illustration"
          className="w-80 md:w-96 mx-auto drop-shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </motion.div>

      {/* Additional feature content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl text-center relative z-10"
      >
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-white text-xl font-semibold mb-2">HR Management</h3>
          <p className="text-white/90">
            Easily manage employee profiles, roles, and status in real-time.
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-white text-xl font-semibold mb-2">Attendance Tracking</h3>
          <p className="text-white/90">
            Monitor employee attendance, leaves, and work hours seamlessly.
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-white text-xl font-semibold mb-2">Reports & Analytics</h3>
          <p className="text-white/90">
            Generate performance and HR analytics to make informed decisions.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;

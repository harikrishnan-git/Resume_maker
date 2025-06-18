import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      console.log("Registered!", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Register
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-10">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition"
        >
          Register User
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-indigo-400 text-center">
        Welcome to Resume Builder
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center max-w-xl">
        Create, view, and manage your professional resumes easily in one place.
      </p>

      <Link
        to="/dashboard" // or "/resumes" depending on your route
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-md transition"
      >
        Show Resumes
      </Link>
    </div>
  );
}

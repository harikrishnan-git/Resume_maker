import React from "react";
import { Link } from "react-router-dom";
import images from "../assets/images.png";

export default function Homepage() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center justify-between px-12 py-10">
      {/* Left Side: Text */}
      <div className="max-w-xl -mt-50">
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
          Tailor Your Resume to <br />
          Any Job — Instantly.
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Stand out with tailored content that fits the role perfectly.
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="max-w-xl ">
        <img
          src={images}
          alt="Resume Preview"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
}

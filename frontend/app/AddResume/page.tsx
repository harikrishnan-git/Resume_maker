"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function AddResume() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white m-20">
        Add Resume
      </h1>

      {/* Card Container */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-8">
        {/* Manual Add Card */}
        <a
          href="#"
          className="w-full sm:w-96 h-64 p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 flex flex-col justify-center items-center text-center"
        >
          <h5 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Add Resume Manually
          </h5>
          <IoMdAdd className="w-12 h-12 text-blue-500" />
        </a>

        {/* Upload Area Card */}
        <label
          htmlFor="dropzone-file"
          className="w-full sm:w-96 h-64 p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 flex flex-col justify-center items-center text-center"
        >
          <div className="flex flex-col items-center justify-center px-4 text-center">
            <svg
              className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF (Max. 1MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}

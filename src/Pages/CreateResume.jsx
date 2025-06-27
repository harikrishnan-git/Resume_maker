import React from "react";
import ResumeForm from "../Components/ResumeForm";

export default function CreateResume() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center py-4">
      <h1 className="text-4xl font-extrabold text-center mt-5 mb-5 text-white">
        Resume Builder
      </h1>
      <ResumeForm />
    </div>
  );
}

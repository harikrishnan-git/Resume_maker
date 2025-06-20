import React, { useEffect } from "react";
import Plain from "../Components/templates/Plain";
import { useNavigate } from "react-router-dom";

export default function viewResume() {
  // Get resume from local storage
  const resume = JSON.parse(localStorage.getItem("resume"));
  const navigate = useNavigate();

  // Check if JD is provided, if not redirect to JD page
  useEffect(() => {
    if (!resume) {
      alert("Submit JD");
      navigate("/jd");
    }
  }, []);

  return (
    <div>
      <Plain />
    </div>
  );
}

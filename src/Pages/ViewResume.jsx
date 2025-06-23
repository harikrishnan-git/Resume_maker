import { useEffect } from "react";
import Plain from "../Components/templates/Plain";
import Sb2nov from "../Components/templates/Sb2nov";
import Template3 from "../Components/templates/Template3";
import { useNavigate } from "react-router-dom";
import { template } from "handlebars";

export default function viewResume() {
  // Get resume from local storage
  const resume = JSON.parse(localStorage.getItem("resume"));
  const resumeTemplate = JSON.parse(localStorage.getItem("resumeTemplate"));
  const navigate = useNavigate();
  const templates = {
    plain: <Plain />,
    sb2nov: <Sb2nov />,
    template3: <Template3 />,
  };
  const selectedTemplate = templates[resumeTemplate] || <Sb2nov />;

  // Check if JD is provided, if not redirect to JD page
  useEffect(() => {
    if (!resume) {
      alert("Create profile first");
      navigate("/resume");
    }
  }, []);

  return <div>{selectedTemplate}</div>;
}

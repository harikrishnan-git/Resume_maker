import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import Jd from "./Pages/Jd";
import CreateResume from "./Pages/CreateResume";
import ResumeDetails from "./Pages/ResumeDetails";
import ViewResume from "./Pages/ViewResume";
import Navbar from "./Components/Navbar";
import HistoryDetails from "./Pages/HistoryDetails";
import check from "./assets/check.png";
import close from "./assets/close.png";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/resume" element={<CreateResume />}></Route>
        <Route path="/resume/:id" element={<ResumeDetails />}></Route>
        <Route path="/history/:id" element={<HistoryDetails />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/jd" element={<Jd />}></Route>
        <Route path="/view-resume" element={<ViewResume />}></Route>
        {/* Add more routes as needed */}
      </Routes>
      <Toaster toastOptions={{
        // Global styles
        style: {
          background: "#000000", // Tailwind white
          color: "#ffffff", // Tailwind black
          fontWeight: "500",
          border: "1px solid #52525B", // Tailwind zinc-600
          fontSize: "14px",
        },
        // Success toast styles
        success: {
          icon: <img src={check} alt="check" className="w-6 h-6" />, 
          duration: 4000,
        },
        // Error toast styles
        error: {
          icon: <img src={close} alt="close" className="w-4 h-4" />,
          duration: 4000,
        },
      }}/>
    </BrowserRouter>
  );
}

export default App;

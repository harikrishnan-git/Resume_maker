import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./Context/authContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);

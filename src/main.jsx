import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MapProvider, MaterialTailwindControllerProvider, PlacesProvider } from "@/context";
import "../public/css/tailwind.css";
import { AuthProvider } from "./context/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <PlacesProvider >
            <MapProvider>
              <AuthProvider>
                 <App />
              </AuthProvider>
            </MapProvider>
          </PlacesProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

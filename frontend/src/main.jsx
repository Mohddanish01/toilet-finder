import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {LocationProvider} from "./context/LocationContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocationProvider>

        <AuthProvider>

            <App/>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  background: "#fff",
                  color: "#111827",
                  fontWeight: "500"
                }
              }}
            />

        </AuthProvider>

    </LocationProvider>
  </StrictMode>,
)

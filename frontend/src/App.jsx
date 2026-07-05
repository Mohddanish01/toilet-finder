import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddToilet from "./pages/AddToilet";
import ToiletDetails from "./pages/ToiletDetails";
import MyDemands from "./pages/MyDemands";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import AddDemand from "./pages/AddDemand";
import EditToilet from "./pages/EditToilet";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
    
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/add-toilet"
          element={
            <ProtectedRoute>
              <AddToilet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/toilet/:id"
          element={<ToiletDetails />}
        />

        <Route
          path="/my-demands"
          element={
            <ProtectedRoute>
              <MyDemands />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-demand"
          element={
            <ProtectedRoute>
              <AddDemand />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-toilet/:id"
          element={<EditToilet />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

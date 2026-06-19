import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddToilet from "./pages/AddToilet";
import ToiletDetails from "./pages/ToiletDetails";
import MyDemands from "./pages/MyDemands";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/add-toilet" element={<AddToilet />} />

        <Route
          path="/toilet/:id"
          element={<ToiletDetails />}
        />

        <Route
          path="/my-demands"
          element={<MyDemands />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

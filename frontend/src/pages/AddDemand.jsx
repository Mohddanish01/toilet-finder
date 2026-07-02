import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddDemand() {

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await res.json();

          const addr = data.address;

          const road =
            addr.road ||
            addr.neighbourhood ||
            addr.suburb ||
            addr.hamlet ||
            "";

          const village =
            addr.village ||
            addr.town ||
            addr.city ||
            "";

          const district =
            addr.county ||
            addr.state_district ||
            "";

          const state =
            addr.state || "";

          const address = [
            road,
            village,
            district,
            state
          ]
          .filter(Boolean)
          .join(", ");

          setAddress(address);
          setLat(lat);
          setLng(lng);

        } catch (error) {

          console.log(error);

        }

      },

      (error) => {

        console.log(error);

      }

    );

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/demands", {
        lat: Number(lat),
        lng: Number(lng)
      });

      alert("Demand Created Successfully");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create demand"
      );

    }

  };

  return (

    <div>

      <h1>Request Public Toilet</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={address}
          readOnly
        />

        <br /><br />

        <input
          type="number"
          value={lat}
          readOnly
        />

        <br /><br />

        <input
          type="number"
          value={lng}
          readOnly
        />

        <br /><br />

        <button type="submit">
          Submit Demand
        </button>

      </form>

    </div>

  );

}

export default AddDemand;
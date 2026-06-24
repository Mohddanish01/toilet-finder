import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddToilet() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/toilets",
        {
          name,
          address,
          lat: Number(lat),
          lng: Number(lng)
        }
      );

      alert("Toilet Added");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add toilet"
      );
    }
  };

  return (
    <div>

      <h1>Add Toilet</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Toilet Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) =>
            setLat(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) =>
            setLng(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Add Toilet
        </button>

      </form>

    </div>
  );
}

export default AddToilet;

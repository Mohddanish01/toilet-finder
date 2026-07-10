import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

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
        lng: Number(lng),
        address
      });

      toast.success(
        "🎉 Demand submitted successfully!"
      );

      navigate("/");

    } catch (error) {

        console.log(error.response?.data);

        if (error.response?.data?.demand) {

          const existingDemand =
            error.response.data.demand;

          const goToDemand =
            window.confirm(

      `A similar demand already exists nearby.

      Address:
      ${existingDemand.address}

      Supporters:
      ${existingDemand.votes}

      Press OK to view this demand.`

            );

          if (goToDemand) {

            // Next step me yahan map navigation karenge

            navigate("/", {
              state: {
                focusDemand: existingDemand
              }
            });

          }

          return;

        }

        toast.error(

          error.response?.data?.message ||

          "Failed to create demand"

        );

      }

  };

  return (

    <div className="bg-slate-50 min-h-screen">

    <div className="max-w-4xl mx-auto px-6 py-10">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">

        <h1 className="text-4xl font-bold text-slate-900">

          🚧 Request a Public Toilet

        </h1>

        <p className="text-slate-500 mt-2">

          Help your community by requesting a public toilet where it's needed most.

        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6">

        📍 Selected Location

        </h2>

        <div className="flex flex-wrap gap-4 mb-6">

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >

            📍 Refresh Current Location

          </button>

        </div>

        <div className="mb-6">

          <label className="block font-semibold text-slate-700 mb-2">

          Address

          </label>

          <input
          type="text"
          value={address}
          readOnly
          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div>

          <label className="block font-semibold text-slate-700 mb-2">

          Latitude

          </label>

          <input
          type="text"
          value={lat}
          readOnly
          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50"
          />

          </div>

          <div>

          <label className="block font-semibold text-slate-700 mb-2">

          Longitude

          </label>

          <input
          type="text"
          value={lng}
          readOnly
          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50"
          />

          </div>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">

          <p className="text-blue-800">

          💡 Your request will be visible to other users.
          If more people support the same location, it helps identify areas that need a public toilet.

          </p>

        </div>

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg transition"
        >

          🚧 Submit Demand

        </button>

      </form>

    </div>

    </div>

  );

}

export default AddDemand;
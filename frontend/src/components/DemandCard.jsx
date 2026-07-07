// import api from "../api/axios";
// import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function DemandCard({ demand, handleDemandVote }) {

  const { user } = useAuth();

  return (

    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-slate-200">

      <div className="flex items-center justify-between">

        <h3 className="text-xl font-bold text-slate-800">

          🚧 Toilet Demand

        </h3>

        <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">

          👍 {demand.votes}

        </div>

      </div>

      <p className="text-slate-500 mt-3">

        A community request for a public toilet in this area.

      </p>

      <div className="mt-5 bg-slate-100 rounded-xl p-3">

        <p className="text-sm text-slate-600">

          📍

          {demand.address || "Location Available on Map"}

        </p>

      </div>

      {
        user ? (

          <button
            onClick={() => handleDemandVote(demand._id)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >

            👍 Support this Demand

          </button>

        ) : (

          <Link
            to="/login"
            className="mt-6 block w-full text-center bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold transition"
          >

            🔒 Login to Support

          </Link>

        )
      }

    </div>

  );
}

export default DemandCard;
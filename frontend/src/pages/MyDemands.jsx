import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function MyDemands() {

  const [demands, setDemands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchMyDemands = async () => {

      try {

        const res = await api.get(
          "/demands/my"
        );

        setDemands(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchMyDemands();

  }, []);

  const handleDeleteDemand = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this demand?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/demands/${id}`);

      setDemands(
        demands.filter(
          (d) => d._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete demand"
      );

    }

  };

  return (
    <div className="bg-slate-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">

      <h1 className="text-4xl font-bold text-slate-900">

      📍 My Toilet Demands

      </h1>

      <p className="text-slate-500 mt-2">

      Track all the locations where you requested a new public toilet.

      </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            📍 Total Demands

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {demands.length}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            👍 Total Support

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {demands.reduce((sum,d)=>sum+d.votes,0)}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            📅 Latest Demand

          </p>

          <h2 className="text-xl font-bold mt-3">

            {
              demands.length
              ? new Date(
                  demands[0].createdAt
                ).toLocaleDateString("en-IN")
              : "--"
            }

          </h2>

        </div>

      </div>

      {
        demands.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">

            <div className="text-6xl mb-4">

              📍

            </div>

            <h2 className="text-2xl font-bold text-slate-800">

              No Demands Yet

            </h2>

            <p className="text-slate-500 mt-3">

              You haven't requested any public toilet yet.

            </p>

            <Link
              to="/add-demand"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              ➕ Create Demand
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {
              demands.map((demand) => (

                <div
                  key={demand._id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-start">

                    <h2 className="text-xl font-bold text-slate-900">

                      📍 Toilet Demand

                    </h2>

                    <div className="flex flex-col items-end">

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold">

                        👍 {demand.votes}

                      </span>

                      <span className="text-xs text-slate-500 mt-1">

                        Community Support

                      </span>

                    </div>

                  </div>

                  <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-4">

                    <div className="flex items-start gap-3">

                      <div className="text-xl">

                        📍

                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">

                          Demand Location

                        </p>

                        <p className="text-sm text-slate-500 mt-1">

                          {demand.address || "Location available on map"}

                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">

                  <span className="text-sm text-slate-500">

                    📅 {
                      new Date(
                        demand.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }
                      )
                    }

                  </span>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        navigate("/", {
                          state: {
                            focusDemand: demand,
                          },
                        })
                      }
                      className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl transition"
                    >
                      🧭 View
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteDemand(demand._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition flex items-center gap-2"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  </div>
  );
}

export default MyDemands;

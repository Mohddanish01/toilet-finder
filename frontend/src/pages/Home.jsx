

import { useEffect, useState } from "react";
import api from "../api/axios";
import ToiletCard from "../components/ToiletCard";
import DemandCard from "../components/DemandCard";
import MapView from "../components/MapView";
import { useNavigate, useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import QuickActions from "../components/QuickActions";
import {
  useLocation as useLocationContext
} from "../context/LocationContext";

function Home() {

  const [toilets, setToilets] = useState([]);
  const [demands, setDemands] = useState([]);
  const [position, setPosition] = useState(null);
  const {
    currentLocation,
    setCurrentLocation,
    locationEnabled,
    setLocationEnabled
  } = useLocationContext();

  const handleDemandVote = async (id) => {

    try {

      const res = await api.post(`/demands/${id}/vote`);

      setDemands((prev) =>
        prev.map((demand) =>
          demand._id === id
            ? { ...demand, votes: res.data.votes }
            : demand
        )
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to vote."
      );

    }

  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

  if (location.state?.focusDemand) {

    window.history.replaceState({}, "");

  }

}, [location]);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });

        // setLocationEnabled(true);


      },

      (err) => {

        console.log(err);

      }

    );

  }, []);

  useEffect(() => {

    if (!position) return;

    const fetchNearbyToilets = async () => {

      try {

        const res = await api.get(

          `/toilets/nearby?lat=${position.lat}&lng=${position.lng}`

        );

        setToilets(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchNearbyToilets();

  }, [position]);

  useEffect(() => {

    // const fetchToilets = async () => {

    //   try {

    //     const res =
    //       await api.get("/toilets");

    //     setToilets(res.data);

    //   } catch (error) {

    //     console.log(error);
    //   }
    // };

    const fetchDemands = async () => {

      try {

        const res =
          await api.get("/demands");

        setDemands(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    // fetchToilets();
    fetchDemands();

  }, []);

  return (
    <>
     <HeroSection />
      <div className="bg-slate-50 min-h-screen">

        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-8">

              <h2 className="text-4xl font-bold text-slate-900">

                Explore Nearby Toilets

              </h2>

              <p className="text-slate-500 mt-2">

                View nearby public toilets and community demands on the interactive map.

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-4">

              <MapView
                toilets={toilets}
                demands={demands}
                position={position}
                locationEnabled={locationEnabled}
                setLocationEnabled={setLocationEnabled}
                handleDemandVote={handleDemandVote}
                focusDemand={location.state?.focusDemand}
              />

            </div>

          </section>

        <div className="max-w-7xl mx-auto px-6 mt-16 mb-8">

          <h2 className="text-4xl font-bold text-slate-900">

            Nearby Public Toilets

          </h2>

          <p className="text-slate-500 mt-2">

            Discover clean public toilets around your current location.

          </p>

        </div>

        {
            !locationEnabled ? (

              <div className="bg-white rounded-3xl shadow-md p-10 text-center max-w-xl mx-auto mt-10">

                <h3 className="text-2xl font-bold text-slate-800">

                  📍 Enable Your Location

                </h3>

                <p className="text-slate-500 mt-4">

                  Allow location access to discover nearby public toilets.

                </p>

              </div>

            ) : toilets.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-md p-10 text-center max-w-xl mx-auto mt-10">

              <h3 className="text-2xl font-bold text-slate-800">

                🚻 No public toilets found within 5 km.

              </h3>

              <p className="text-slate-500 mt-4">

                You can help your area by creating a toilet demand.

              </p>

              <button
                onClick={() => navigate("/add-demand")}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
              >

                🚩 Request a Toilet

              </button>

            </div>

          ) : (

            <div className="max-w-7xl mx-auto px-6 mt-10">

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {
                  toilets.map((toilet) => (

                    <ToiletCard
                      key={toilet._id}
                      toilet={toilet}
                      position={position}
                    />

                  ))
                }

              </div>
            </div>

          )
        }

        <div className="max-w-7xl mx-auto px-6 mt-20">

        <h2 className="text-4xl font-bold">

        Community Toilet Demands

        </h2>

        <p className="text-slate-500 mt-2">

        Support areas where public toilets are needed.

        </p>

        </div>

        {
          demands.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-md p-10 text-center max-w-xl mx-auto mt-10">

              <h3 className="text-2xl font-bold text-slate-800">

                🚧 No Community Demands Yet

              </h3>

              <p className="text-slate-500 mt-4">

                Great news! There are currently no pending toilet requests.

              </p>

            </div>

          ) : (

            <div className="max-w-7xl mx-auto px-6 mt-12">

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {
                  demands.map((demand) => (

                    <DemandCard
                      key={demand._id}
                      demand={demand}
                      handleDemandVote={handleDemandVote}
                    />

                  ))
                }

              </div>

            </div>

          )
        }

      </div>
    </>
  );
}

export default Home;

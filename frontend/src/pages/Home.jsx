

import { useEffect, useState } from "react";
import api from "../api/axios";
import ToiletCard from "../components/ToiletCard";
import DemandCard from "../components/DemandCard";
import MapView from "../components/MapView";
import { useNavigate } from "react-router-dom";

function Home() {

  const [toilets, setToilets] = useState([]);
  const [demands, setDemands] = useState([]);
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });

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
    <div>

      <MapView
        toilets={toilets}
        demands={demands}
        position={position}
      />

      <h1>Nearby Public Toilets</h1>

      {
        toilets.length === 0 ? (

          <div>

            <h3>
              🚻 No public toilets found within 5 km.
            </h3>

            <p>
              You can help your area by creating a toilet demand.
            </p>
            
            <button
              onClick={() => navigate("/add-demand")}
            >
              🚩 Request a Toilet
            </button>

          </div>

        ) : (

          toilets.map((toilet) => (

            <ToiletCard
              key={toilet._id}
              toilet={toilet}
              position={position}
            />

          ))

        )
      }

      <h1>Toilet Demands</h1>

      {
        demands.length === 0
        ? (
            <p>No demands found</p>
          )
        : (
            demands.map((demand) => (

              <DemandCard
                key={demand._id}
                demand={demand}
              />

            ))
          )
      }

    </div>
  );
}

export default Home;

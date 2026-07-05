import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  // useMapEvents
} from "react-leaflet";

import { Link } from "react-router-dom";
// import { useLocation } from "../context/LocationContext";
import { getDistance } from "../utils/distance";

import L from "leaflet";
import "leaflet.awesome-markers";

const userIcon = L.AwesomeMarkers.icon({
  icon: "user",
  prefix: "fa",
  markerColor: "green"
});

const toiletIcon = L.AwesomeMarkers.icon({
  icon: "restroom",
  prefix: "fa",
  markerColor: "blue"
});

const demandIcon = L.AwesomeMarkers.icon({
  icon: "flag",
  prefix: "fa",
  markerColor: "red"
});

function ChangeMapView({ center }) {

  const map = useMap();

  useEffect(() => {

    map.setView(center, 15);

  }, [center, map]);

  return null;
}

const fetchAddress = async (
  lat,
  lng,
  setSelectedLocation
) => {

  console.log("Fetching Address...");
  try {

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();
    console.log(data);

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

    setSelectedLocation({
      lat,
      lng,
      address: [road, village, district, state]
    .filter(Boolean)
    .join(", ")
    });

  } catch (error) {

    console.log(error);

  }
};

function MapClickHandler({ setSelectedLocation }) {  // coordinates autofill ke liye

  useMapEvents({

    click(e) {

      console.log("Latitude:", e.latlng.lat);
      console.log("Longitude:", e.latlng.lng);

      fetchAddress(
        e.latlng.lat,
        e.latlng.lng,
        setSelectedLocation
      );

    }

  });

  return null;
}


function MapView({ toilets, demands, position, enableLocationSelection = false}) {

  // const [selectedPosition, setSelectedPosition] = useState(null);
  if (!position) {
    return <h2>Loading Map...</h2>;
  }

  // const { selectedLocation, setSelectedLocation } = useLocation();


  return (

    <div>
      <MapContainer  // current location show krega
        // center={[28.6139, 77.2090]}
        center={[position.lat, position.lng]}
        zoom={13}
        style={{
          height: "500px",
          width: "100%"
        }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {
          enableLocationSelection && (

            <MapClickHandler
              setSelectedLocation={setSelectedLocation}
            />

          )
        } */}

        <ChangeMapView
          center={[
            position.lat,
            position.lng
          ]}
        />

        <Marker
          position={[
            position.lat,
            position.lng
          ]}
          icon={userIcon}
        >

          <Popup>

            You are here

          </Popup>

        </Marker>

        {/* {
          selectedLocation  && (

            <Marker
              position={[
                selectedLocation.lat,
                selectedLocation.lng
              ]}
            >

              <Popup>

                Selected Location

              </Popup>

            </Marker>

          )
        } */}

        {  // toilet show krega
          toilets.map((toilet) => (

          <Marker
            key={toilet._id}
            position={[
              toilet.location.coordinates[1],
              toilet.location.coordinates[0]
            ]}
            icon={toiletIcon}
          >
          <Popup>

            <h3>
              🚻 {toilet.name}
            </h3>

            <p>
              📍 {toilet.address}
            </p>

            <p>
              📏 {
                getDistance(
                  position.lat,
                  position.lng,
                  toilet.location.coordinates[1],
                  toilet.location.coordinates[0]
                )
              } away
            </p>

            <p>
              ⭐ {toilet.avg_rating.toFixed(1)}
            </p>

            <p>
              📝 {toilet.total_reviews} Reviews
            </p>

            <br />

            <button
              onClick={() => {

                const lat =
                  toilet.location.coordinates[1];

                const lng =
                  toilet.location.coordinates[0];

                window.open(

                  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,

                  "_blank"

                );

              }}
            >
              🧭 Get Directions
            </button>

            <br /><br />

            <Link
              to={`/toilet/${toilet._id}`}
            >
              👁️ View Details
            </Link>

          </Popup>

          </Marker>

        ))
      }

      {  // demand show krega
        demands.map((demand) => (

          <Marker
            key={demand._id}
            position={[
              demand.location.coordinates[1],
              demand.location.coordinates[0]
            ]}
            icon={demandIcon}
          >

          <Popup>

            <h3>
              🚧 Toilet Needed
            </h3>

            <p>
              👍 Votes:
              {demand.votes}
            </p>

            <p>
              Help this area get
              a public toilet.
            </p>

          </Popup>

          </Marker>

        ))
      }

    </MapContainer>

    <div
      style={{
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        marginTop: "10px",
        width: "250px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}
    >

      <h3>Map Legend</h3>

      <p>🟢 Your Location</p>

      <p>🔵 Public Toilet</p>

      <p>🔴 Toilet Demand</p>

    </div>

  </div>


  );
}

export default MapView;
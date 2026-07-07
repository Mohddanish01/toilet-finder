import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from "react-leaflet";

import { useRef } from "react";

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

const selectedToiletIcon = L.AwesomeMarkers.icon({
  icon: "restroom",
  prefix: "fa",
  markerColor: "orange"
});

function ChangeMapView({ center }) {

  const map = useMap();

  useEffect(() => {

    map.setView(center, 15);

  }, [center, map]);

  return null;
}

function FlyToLocation({ target }) {

  const map = useMap();

  useEffect(() => {

    if (!target) return;

    map.flyTo([target.lat, target.lng], 15, {
      duration: 0.8
    });

  }, [target, map]);

  return null;

}


function FitNearby({ currentLocation, toilets, demands }) {

  const map = useMap();

  useEffect(() => {

    if (!currentLocation) return;

    const bounds = L.latLngBounds([
      [currentLocation.lat, currentLocation.lng]
    ]);

    toilets.forEach((toilet) => {

      bounds.extend([
        toilet.location.coordinates[1],
        toilet.location.coordinates[0]
      ]);

    });

    demands.forEach((demand) => {

      bounds.extend([
        demand.location.coordinates[1],
        demand.location.coordinates[0]
      ]);

    });

    map.fitBounds(bounds, {
      padding: [80, 80],
      maxZoom: 16
    });

  }, [currentLocation, toilets, demands, map]);

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


function MapView({ toilets, demands, position, locationEnabled, setLocationEnabled, handleDemandVote, enableLocationSelection = false}) {

  // const [selectedPosition, setSelectedPosition] = useState(null);
  if (!position) {

    return (

      <div className="animate-pulse">

        <div className="h-[450px] w-full rounded-2xl bg-slate-200"></div>

        <div className="flex justify-center mt-5">

          <div className="bg-white shadow-md rounded-xl px-5 py-3">

            <p className="text-slate-500 font-medium">

              📍 Loading Map...

            </p>

          </div>

        </div>

      </div>

    );

  }
  const markerRef = useRef(null);
  const { user } = useAuth();

  const [currentLocation, setCurrentLocation] = useState(null);

  // const [locationEnabled, setLocationEnabled] = useState(false);

  const handleLocate = () => {

    // setLocationEnabled(true);

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        setCurrentLocation(location);
        setLocationEnabled(true);

        setTimeout(() => {
          markerRef.current?.openPopup();
        }, 1600);

      },

      () => {

        alert("Unable to get your location.");

      }

    );

  };


  return (

    // <div>
    <div className="relative z-0">
      <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          style={{
              height: "450px",
              width: "100%",
              borderRadius: "20px"
          }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView
          center={[
            position.lat,
            position.lng
          ]}
        />

        <FlyToLocation target={currentLocation} />

        <FitNearby
          currentLocation={currentLocation}
          toilets={toilets}
          demands={demands}
        />

        {
          locationEnabled && (

            <Marker
              ref={markerRef}
              position={[
                currentLocation?.lat || position.lat,
                currentLocation?.lng || position.lng
              ]}
              icon={userIcon}
            >

              <Popup>

                📍 You are here

              </Popup>

            </Marker>

          )
        }

        {  // toilet show krega
          locationEnabled &&
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

            <div className="w-52 p-2">

              <h3 className="text-lg font-bold text-slate-900">

                🚻 {toilet.name}

              </h3>

            <p className="text-sm text-slate-600 mt-1 line-clamp-2">

              📍 {toilet.address}

            </p>

            <div className="inline-flex mt-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              📏 {
                getDistance(
                  position.lat,
                  position.lng,
                  toilet.location.coordinates[1],
                  toilet.location.coordinates[0]
                )
              } away
            </div>

            <div className="flex items-center justify-between mt-2">

              <span className="font-semibold text-yellow-500">

                ⭐ {toilet.avg_rating.toFixed(1)}

              </span>

              <span className="text-sm text-slate-500">

                {toilet.total_reviews} Reviews

              </span>

            </div>

            <br />
            <hr className="my-2" />

            <button
              onClick={() => {

                const lat = toilet.location.coordinates[1];
                const lng = toilet.location.coordinates[0];

                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                  "_blank"
                );

              }}

              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg font-medium transition"
            >

              🧭 Get Directions

            </button>

            <br /><br />

            <Link
              to={`/toilet/${toilet._id}`}
              className="block w-full text-center border border-slate-300 hover:bg-slate-100 py-1.5 rounded-lg font-medium transition"
            >

              👁 View Details

            </Link>
            </div>

          </Popup>

          </Marker>

        ))
      }

      {  // demand show krega
        locationEnabled &&
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

            <div className="w-52 p-2">

              <h3 className="text-lg font-bold text-slate-900">

                🚧 Toilet Demand

              </h3>

              <p className="text-sm text-slate-600 mt-2">

                📍 {demand.address}

              </p>

              <p className="text-sm text-slate-500 mt-3">

                Residents have requested a public toilet in this area.

              </p>

              <div className="mt-4 inline-flex bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">

                👍 {demand.votes} Supports

              </div>

              <hr className="my-3" />

              {/* <button
                onClick={() => handleDemandVote(demand._id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >

                👍 Support this Demand

              </button> */}
              {
                user ? (

                  <button
                    onClick={() => handleDemandVote(demand._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                  >
                    👍 Support this Demand
                  </button>

                ) : (

                  <Link
                    to="/login"
                    className="block w-full text-center bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium transition"
                  >
                    🔒 Login to Support
                  </Link>

                )
              }

            </div>

          </Popup>

          </Marker>

        ))
      }

    </MapContainer>

    {
      !locationEnabled && (

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">

          <button
            onClick={handleLocate}
            className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-xl text-lg font-semibold transition"
          >
            📍 Enable Current Location
          </button>

        </div>

      )
    }

    {
      locationEnabled && (

        <div className="absolute top-5 right-5 z-[1000] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-3 border border-slate-200">

          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Your Location
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Public Toilet
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            Toilet Demand
          </div>

        </div>

      )
    }

  </div>


  );
}

export default MapView;
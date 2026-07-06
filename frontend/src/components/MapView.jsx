import { useEffect, useState } from "react";

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
// const handleLocate = () => {

//   navigator.geolocation.getCurrentPosition(

//     (pos) => {

//       const location = {
//         lat: pos.coords.latitude,
//         lng: pos.coords.longitude
//       };

//       setCurrentLocation(location);

//       setTimeout(() => {
//         markerRef.current?.openPopup();
//       }, 1600);

//     },

//     () => {

//       alert("Unable to get your location.");

//     }

//   );

// };

// function LocateMeButton({ markerRef }) {

//   const map = useMap();

//   const handleLocate = () => {

//     navigator.geolocation.getCurrentPosition(

//       (pos) => {

//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;

//         map.flyTo([lat, lng], 16, {
//           duration: 1.5
//         });

//         setTimeout(() => {
//           markerRef.current?.openPopup();
//         }, 1200);

//       },

//       () => {

//         alert("Unable to get your location.");

//       }

//     );

//   };

//   return (

//     <button
//       onClick={handleLocate}
//       className="absolute bottom-5 right-5 z-[1000] bg-white shadow-xl rounded-full w-14 h-14 flex items-center justify-center hover:bg-blue-50 transition text-2xl"
//       title="Locate Me"
//     >
//       📍
//     </button>

//   );

// }

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
  const markerRef = useRef(null);

  const [currentLocation, setCurrentLocation] = useState(null);

  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleLocate = () => {

    setLocationEnabled(true);

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        setCurrentLocation(location);

        setTimeout(() => {
          markerRef.current?.openPopup();
        }, 1600);

      },

      () => {

        alert("Unable to get your location.");

      }

    );

  };

  // const { selectedLocation, setSelectedLocation } = useLocation();


  return (

    // <div>
    <div className="relative">
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

        {/* <LocateControl markerRef={markerRef} /> */}

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

        <FlyToLocation target={currentLocation} />

        <FitNearby
          currentLocation={currentLocation}
          toilets={toilets}
          demands={demands}
        />

        {/* <Marker
          position={[
            position.lat,
            position.lng
          ]}
          icon={userIcon}
        > */}
        {/* <Marker
          ref={markerRef}
          position={[
            currentLocation?.lat || position.lat,
            currentLocation?.lng || position.lng
          ]}
          icon={userIcon}
        >

          <Popup>

            You are here

          </Popup>

        </Marker> */}

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

    {/* <button
      onClick={handleLocate}
      className="absolute bottom-24 right-6 bg-white rounded-full shadow-xl w-14 h-14 text-2xl hover:scale-105 transition"
    >
      📍
    </button> */}

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

    {/* <LocateMeButton markerRef={markerRef} /> */}
      {/* {
      locationEnabled && (
      <div className="flex flex-wrap gap-3 mt-5">

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">

          🟢 Your Location

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

          🔵 Public Toilet

        </div>

        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">

          🔴 Toilet Demand

        </div>

      </div>
      )
      } */}

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
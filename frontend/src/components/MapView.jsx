import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import { Link } from "react-router-dom";

function ChangeMapView({ center }) {

  const map = useMap();

  useEffect(() => {

    map.setView(center, 15);

  }, [center, map]);

  return null;
}

function MapView({ toilets, demands }) {

  const [position, setPosition] = useState([
    28.6139,
    77.2090
  ]);

  useEffect(() => {   // current location ke liye

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        setPosition([
          pos.coords.latitude,
          pos.coords.longitude
        ]);

      },

      (err) => {

        console.log(err);

      }

    );

  }, []);

  return (

    <MapContainer  // current location show krega
      // center={[28.6139, 77.2090]}
      center={position}
      zoom={13}
      style={{
        height: "500px",
        width: "100%"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ChangeMapView
        center={position}
      />

      <Marker position={position}>

        <Popup>

          You are here

        </Popup>

      </Marker>

      {  // toilet show krega
        toilets.map((toilet) => (

        <Marker
          key={toilet._id}
          position={[
            toilet.location.coordinates[1],
            toilet.location.coordinates[0]
          ]}
        >
        <Popup>

          <h3>
            {toilet.name}
          </h3>

          <p>
            📍 {toilet.address}
          </p>

          <p>
            ⭐ Average Rating:
            {toilet.avg_rating.toFixed(1)}
          </p>

          <p>
            📝 Reviews:
            {toilet.total_reviews}
          </p>

          <Link
            to={`/toilet/${toilet._id}`}
          >
            View Details
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

  );
}

export default MapView;
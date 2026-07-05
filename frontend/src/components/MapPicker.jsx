import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ onLocationSelect, selectable}) {

  const [position, setPosition] = useState(null);

  useMapEvents({

    click(e) {

      if (!selectable) return;

      setPosition(e.latlng);

      onLocationSelect(
        e.latlng.lat,
        e.latlng.lng
      );

    }

  });

  return position
    ? <Marker position={position} />
    : null;

}

function MapPicker({ onLocationSelect, center, selectable = false}) {

  return (

    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        marginTop: "20px"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        onLocationSelect={onLocationSelect}
        selectable={selectable}
      />

    </MapContainer>

  );

}

export default MapPicker;
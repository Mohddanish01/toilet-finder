import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap
} from "react-leaflet";

import {
  useState,
  useEffect
} from "react";

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

function ResizeMap() {

  const map = useMap();

  useEffect(() => {

    const timer = setTimeout(() => {

      map.invalidateSize();

    }, 150);

    return () => clearTimeout(timer);

  }, [map]);

  return null;

}

function MapPicker({ onLocationSelect, center, selectable = false}) {

  return (

    <MapContainer
      center={center}
      zoom={13}
      className="h-[400px] w-full"
    >

      <ResizeMap />

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
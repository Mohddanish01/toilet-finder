import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useLocation } from "../context/LocationContext";
import MapPicker from "../components/MapPicker";
import ToiletForm from "../components/ToiletForm";
import toast from "react-hot-toast";

function AddToilet() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [facilities, setFacilities] = useState({
    male: false,
    female: false,
    wheelchair: false,
    drinkingWater: false,
    tissue: false
  });

  const [isFree, setIsFree] = useState(true);

  const [openingHours, setOpeningHours] = useState("24 Hours");

  const [images, setImages] = useState([]);

  const {selectedLocation, setSelectedLocation} = useLocation();
  console.log("Selected Location:",selectedLocation);

  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState([
    28.6139,
    77.2090
  ]);

  const navigate = useNavigate();

  useEffect(() => {

    if (selectedLocation) {

      setLat(selectedLocation.lat);
      setLng(selectedLocation.lng);
      setAddress(selectedLocation.address || "");

    }

  }, [selectedLocation]);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        setCurrentLocation([
          pos.coords.latitude,
          pos.coords.longitude
        ]);

      },

      (err) => {

        console.log(err);

      }

    );

  }, []);


  const handleCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await res.json();

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

          const address = [
            road,
            village,
            district,
            state
          ]
            .filter(Boolean)
            .join(", ");

          setSelectedLocation({
            lat,
            lng,
            address
          });

        } catch (error) {

          console.log(error);

        }

      },

      (error) => {

        console.log(error);

        toast.error("Unable to get current location.");

      }

    );

  };

  const handleMapLocation = async (
    lat,
    lng
  ) => {

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();

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

    const address =
      [road, village, district, state]
        .filter(Boolean)
        .join(", ");

    setSelectedLocation({

      lat,

      lng,

      address

    });

    setShowMap(false);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("address", address);
      formData.append("lat", Number(lat));
      formData.append("lng", Number(lng));

      formData.append(
        "facilities",
        JSON.stringify(facilities)
      );

      formData.append("isFree", isFree);

      formData.append(
        "openingHours",
        openingHours
      );

      images.forEach((image) => {

        formData.append("images", image);

      });

      await api.post(
        "/toilets",
        formData
      );

      toast.success("Toilet Added");

      navigate("/");

    } catch (error) {

      console.log(error.response?.data);

      console.log(error);


      toast.error(
        error.response?.data?.message ||
        "Failed to add toilet"
      );

    }

  };

  return (
    <div>

      <h1>Add Toilet</h1>

      <ToiletForm
        name={name}
        setName={setName}

        address={address}
        setAddress={setAddress}

        lat={lat}
        setLat={setLat}

        lng={lng}
        setLng={setLng}

        facilities={facilities}
        setFacilities={setFacilities}

        isFree={isFree}
        setIsFree={setIsFree}

        openingHours={openingHours}
        setOpeningHours={setOpeningHours}

        images={images}
        setImages={setImages}

        pageTitle="🚻 Add Public Toilet"

        pageDescription="Help your community by adding a verified public toilet."

        submitButtonText="➕ Add Public Toilet"

        handleCurrentLocation={handleCurrentLocation}

        setShowMap={setShowMap}
        mapRef={mapRef}

        handleSubmit={handleSubmit}
      />

      {
        showMap && (

          <div
            ref={mapRef}
            className="max-w-6xl mx-auto px-6 pb-10"
          >

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-4">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">

                    📍 Select Toilet Location

                  </h2>

                  <p className="text-slate-500 mt-1">

                    Click anywhere on the map to choose the location.

                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setShowMap(false)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >

                  ✕

                </button>

              </div>

            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">

              <MapPicker
                center={currentLocation}
                onLocationSelect={handleMapLocation}
                selectable={true}
              />

            </div>

          </div>

        )
      }

    </div>
  );
}

export default AddToilet;

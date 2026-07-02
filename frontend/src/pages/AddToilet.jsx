import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useLocation } from "../context/LocationContext";
import MapPicker from "../components/MapPicker";
import ToiletForm from "../components/ToiletForm";

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

  const {selectedLocation, setSelectedLocation} = useLocation();
  console.log("Selected Location:",selectedLocation);

  const [showMap, setShowMap] = useState(false);
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

        alert("Unable to get current location.");

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

      await api.post(
        "/toilets",
        {
          name,
          address,
          lat: Number(lat),
          lng: Number(lng),
          facilities,
          isFree,
          openingHours
        }
      );

      alert("Toilet Added");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add toilet"
      );
    }
  };

  return (
    <div>

      <h1>Add Toilet</h1>

      <ToiletForm />

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Toilet Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <button
          type="button"
          onClick={handleCurrentLocation}
        >

          📍 Use My Current Location

        </button>

        <br /><br />

        <button  // map se location select krne ke liye
          type="button"
          onClick={() => setShowMap(true)}
        >
          🗺️ Select From Map
        </button>

        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) =>
            setLat(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) =>
            setLng(e.target.value)
          }
        />

        <br /><br />

        <h3>Facilities</h3>

        <label>
          <input
            type="checkbox"
            checked={facilities.male}
            onChange={(e) =>
              setFacilities({
                ...facilities,
                male: e.target.checked
              })
            }
          />
          Male Toilet
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={facilities.female}
            onChange={(e) =>
              setFacilities({
                ...facilities,
                female: e.target.checked
              })
            }
          />
          Female Toilet
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={facilities.wheelchair}
            onChange={(e) =>
              setFacilities({
                ...facilities,
                wheelchair: e.target.checked
              })
            }
          />
          Wheelchair Accessible
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={facilities.drinkingWater}
            onChange={(e) =>
              setFacilities({
                ...facilities,
                drinkingWater: e.target.checked
              })
            }
          />
          Drinking Water
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={facilities.tissue}
            onChange={(e) =>
              setFacilities({
                ...facilities,
                tissue: e.target.checked
              })
            }
          />
          Tissue Available
        </label>

        <br /><br />

        <h3>Pricing</h3>

        <label>
          <input
            type="radio"
            checked={isFree}
            onChange={() => setIsFree(true)}
          />
          Free
        </label>

        <label
          style={{ marginLeft: "20px" }}
        >
          <input
            type="radio"
            checked={!isFree}
            onChange={() => setIsFree(false)}
          />
          Paid
        </label>

        <br /><br />

        <input
          type="text"
          placeholder="Opening Hours"
          value={openingHours}
          onChange={(e) =>
            setOpeningHours(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Add Toilet
        </button>

      </form>

      {
        showMap && (
          <MapPicker
              center={currentLocation}
              onLocationSelect={handleMapLocation}
          />
        )
      }

    </div>
  );
}

export default AddToilet;

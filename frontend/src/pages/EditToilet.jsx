import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import ToiletForm from "../components/ToiletForm";

function EditToilet() {

    const { id } = useParams();
    const navigate = useNavigate();

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

    const [openingHours, setOpeningHours] =
    useState("24 Hours");

    useEffect(() => {

    const fetchToilet = async () => {

        try {

        const res =
            await api.get(`/toilets/${id}`);

        const toilet = res.data;

        setName(toilet.name);

        setAddress(toilet.address);

        setLat(toilet.location.coordinates[1]);

        setLng(toilet.location.coordinates[0]);

        setFacilities(toilet.facilities);

        setIsFree(toilet.isFree);

        setOpeningHours(
            toilet.openingHours
        );

        } catch (error) {

        console.log(error);

        }

    };

    fetchToilet();

    }, [id]);

    const handleUpdate = async (e) => {

      e.preventDefault();

      try {

        await api.put(

          `/toilets/${id}`,

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

        alert("Toilet Updated Successfully");

        navigate(`/toilet/${id}`);

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to update"

        );

      }

    };

  return (

    <div>

      <h1>Edit Toilet</h1>

      <p>Toilet ID: {id}</p>

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

      handleCurrentLocation={() => {}}

      setShowMap={() => {}}

      handleSubmit={handleUpdate}
    />


    </div>

  );

}

export default EditToilet;
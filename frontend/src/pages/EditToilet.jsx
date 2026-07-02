import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditToilet() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

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

  return (

    <div>

      <h1>Edit Toilet</h1>

      <p>Toilet ID: {id}</p>

      <h2>{name}</h2>

      <p>{address}</p>

      <p>{openingHours}</p>

    </div>

  );

}

export default EditToilet;
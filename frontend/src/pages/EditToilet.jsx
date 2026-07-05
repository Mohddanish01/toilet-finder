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

    const [images, setImages] = useState([]);

    const [newImages, setNewImages] = useState([]);

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

        setImages(toilet.images || []);

        } catch (error) {

        console.log(error);

        }

    };

    fetchToilet();

    }, [id]);

    const handleDeleteImage = async (image) => {

      const confirmDelete = window.confirm(
        "Delete this image?"
      );

      if (!confirmDelete) return;

      try {

        const res = await api.delete(
          `/toilets/${id}/images`,
          {
            data: { image }
          }
        );

        setImages(res.data.images);

        alert("Image deleted successfully");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to delete image"
        );

      }

    };

    const handleUpdate = async (e) => {

      e.preventDefault();

      try {

        // await api.put(

        //   `/toilets/${id}`,

        //   {
        //     name,
        //     address,
        //     lat: Number(lat),
        //     lng: Number(lng),
        //     facilities,
        //     isFree,
        //     openingHours
        //   }

        // );
        const formData = new FormData();

        formData.append("name", name);
        formData.append("address", address);
        formData.append("lat", lat);
        formData.append("lng", lng);

        formData.append(
          "facilities",
          JSON.stringify(facilities)
        );

        formData.append("isFree", isFree);
        formData.append(
          "openingHours",
          openingHours
        );

        newImages.forEach((image) => {
          formData.append("images", image);
        });

        await api.put(
          `/toilets/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
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

      <h2>Current Images</h2>

      {
        images.length === 0 ? (

          <p>No Images</p>

        ) : (

          images.map((image, index) => (

            <div
              key={index}
              style={{
                marginBottom: "20px"
              }}
            >

              <img
                src={`http://localhost:5000${image}`}
                alt="Toilet"
                width="220"
              />

              <br /><br />

              <button
                onClick={() =>
                  handleDeleteImage(image)
                }
              >
                🗑 Delete Image
              </button>

            </div>

          ))

        )
      }

      <h2>Add New Images</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setNewImages([...e.target.files])
        }
      />

      <br /><br />

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

      showImageUpload={false}

      handleCurrentLocation={() => {}}

      setShowMap={() => {}}

      handleSubmit={handleUpdate}
    />


    </div>

  );

}

export default EditToilet;
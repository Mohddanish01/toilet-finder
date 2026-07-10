import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import ToiletForm from "../components/ToiletForm";
import toast from "react-hot-toast";

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

    const [loading, setLoading] = useState(false);

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

        toast.success("Image deleted successfully");

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to delete image"
        );

      }

    };

    const handleUpdate = async (e) => {

      e.preventDefault();
      setLoading(true);

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
        setLoading(false);

        navigate(`/toilet/${id}`, {
          state: {
            success: "Toilet updated successfully!"
          }
        });

      } catch (error) {
        setLoading(false);

        console.log(error);

        toast.error(

          error.response?.data?.message ||

          "Failed to update"

        );

      }

    };

  return (

    <div className="bg-slate-50 min-h-screen">

    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">

        <h1 className="text-4xl font-bold text-slate-900">

          ✏️ Edit Toilet

        </h1>

        <p className="text-slate-500 mt-2">

          Update toilet information, facilities and images.

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">

        <h2 className="text-2xl font-bold text-slate-900 mb-5">

          📷 Current Images

        </h2>

        {
          images.length === 0 ? (

            <div className="text-center text-slate-500 py-10">

              No Images Available

            </div>

          ) : (

            <div className="flex gap-4 overflow-x-auto pb-2">

              {
                images.map((image, index) => (

                  <div
                    key={index}
                    className="relative w-40 h-40 flex-shrink-0 group"
                  >

                    <img
                      src={`http://localhost:5000${image}`}
                      alt=""
                      className="w-full h-full object-cover rounded-xl border border-slate-200 shadow-sm transition group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteImage(image)
                      }
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/70 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                    >

                      ✕

                    </button>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">

        <h2 className="text-2xl font-bold text-slate-900 mb-5">

          ➕ Add New Images

        </h2>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">

          <span className="text-5xl">

            ☁️

          </span>

          <p className="mt-4 text-xl font-semibold">

            Upload More Images

          </p>

          <p className="text-slate-500">

            JPG, PNG • Multiple Images

          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setNewImages([...e.target.files])
            }
          />

          {
            newImages.length > 0 && (

              <div className="flex gap-4 mt-6 overflow-x-auto">

                <div className="flex gap-4 mt-6 overflow-x-auto">

                  {
                    newImages.map((image, index) => (

                      <div
                        key={index}
                        className="relative w-28 h-28 flex-shrink-0 group"
                      >

                        <img
                          src={URL.createObjectURL(image)}
                          alt=""
                          className="w-full h-full rounded-xl object-cover border border-slate-200 shadow-sm transition duration-300 group-hover:scale-105"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setNewImages(
                              newImages.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/70 hover:bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center transition duration-200"
                        >
                          ✕
                        </button>

                      </div>

                    ))
                  }

                </div>

              </div>

            )
          }

        </label>

      </div>

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

      pageTitle="✏️ Edit Toilet"

      pageDescription="Update toilet information, facilities and images."

      submitButtonText="💾 Save Changes"

      loading={loading}

      handleCurrentLocation={() => {}}

      setShowMap={() => {}}

      handleSubmit={handleUpdate}
    />


    </div>
    </div>

  );

}

export default EditToilet;
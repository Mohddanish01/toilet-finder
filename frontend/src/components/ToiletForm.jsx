// function ToiletForm({

//   name,
//   setName,

//   address,
//   setAddress,

//   lat,
//   setLat,

//   lng,
//   setLng,

//   facilities,
//   setFacilities,

//   isFree,
//   setIsFree,

//   openingHours,
//   setOpeningHours,

//   handleCurrentLocation,

//   showMap,
//   setShowMap,

//   handleSubmit

// }) {

//   return (

//     <form onSubmit={handleSubmit}>

//       <h2>Toilet Form</h2>

//       <input
//         type="text"
//         placeholder="Toilet Name"
//         value={name}
//         onChange={(e) =>
//           setName(e.target.value)
//         }
//       />

//       <br /><br />

//       <button
//         type="button"
//         onClick={handleCurrentLocation}
//       >

//         📍 Use My Current Location

//       </button>

//       <br /><br />

//       <button
//         type="button"
//         onClick={() => setShowMap(true)}
//       >
//         🗺️ Select From Map
//       </button>

//       <br /><br />

//     </form>

//   );

// }

// export default ToiletForm;

function ToiletForm({

  name,
  setName,

  address,
  setAddress,

  lat,
  setLat,

  lng,
  setLng,

  facilities,
  setFacilities,

  isFree,
  setIsFree,

  openingHours,
  setOpeningHours,

  images,
  setImages,

  showImageUpload = true,

  pageTitle = "🚻 Add Public Toilet",
  pageDescription = "Help your community by adding a verified public toilet.",

  submitButtonText = "➕ Add Public Toilet",

  loading = false,

  handleCurrentLocation,

  setShowMap,

  handleSubmit

}) {

  return (

    <div className="bg-slate-50 min-h-screen">

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-900">

            {pageTitle}

          </h1>

          <p className="text-slate-500 mt-2">

            {pageDescription}

          </p>

        </div>

      <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
      >

      <div className="mb-8">

        <label className="block text-lg font-semibold text-slate-800 mb-3">

          🚻 Toilet Name

        </label>

        <input
          type="text"
          placeholder="Enter toilet name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8">

        <h2 className="text-xl font-bold text-slate-900 mb-5">

          📍 Location

        </h2>

        <div className="flex flex-wrap gap-3 mb-5">

          <button
            type="button"
            onClick={handleCurrentLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
          >
            📍 Use Current Location
          </button>

          <button
            type="button"
            onClick={() => setShowMap(true)}
            className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-xl transition"
          >
            🗺 Select From Map
          </button>

        </div>

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4"
        />

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3"
          />

        </div>

      </div>

      <br /><br />

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8">

        <h2 className="text-xl font-bold text-slate-900 mb-5">

          ✨ Facilities

        </h2>

        <div className="flex flex-wrap gap-3">

          <label
            className={`cursor-pointer rounded-xl border px-6 py-3 flex items-center justify-center gap-2 transition
            ${
              facilities.male
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-slate-300 hover:border-blue-400"
            }`}
          >

            <input
              type="checkbox"
              checked={facilities.male}
              onChange={(e) =>
                setFacilities({
                  ...facilities,
                  male: e.target.checked
                })
              }
              className="hidden"
            />

            🚹 Male

          </label>

          <label
            className={`cursor-pointer rounded-xl border px-6 py-3 flex items-center justify-center gap-2 transition
            ${
              facilities.female
                ? "bg-pink-100 border-pink-500"
                : "bg-white border-slate-300 hover:border-pink-400"
            }`}
          >

            <input
              type="checkbox"
              checked={facilities.female}
              onChange={(e) =>
                setFacilities({
                  ...facilities,
                  female: e.target.checked
                })
              }
              className="hidden"
            />

            🚺 Female

          </label>

          <label
            className={`cursor-pointer rounded-xl border px-6 py-3 flex items-center justify-center gap-2 transition
            ${
              facilities.wheelchair
                ? "bg-green-100 border-green-500"
                : "bg-white border-slate-300 hover:border-green-400"
            }`}
          >

            <input
              type="checkbox"
              checked={facilities.wheelchair}
              onChange={(e) =>
                setFacilities({
                  ...facilities,
                  wheelchair: e.target.checked
                })
              }
              className="hidden"
            />

            ♿ Accessible

          </label>

          <label
            className={`cursor-pointer rounded-xl border px-6 py-3 flex items-center justify-center gap-2 transition
            ${
              facilities.drinkingWater
                ? "bg-cyan-100 border-cyan-500"
                : "bg-white border-slate-300 hover:border-cyan-400"
            }`}
          >

            <input
              type="checkbox"
              checked={facilities.drinkingWater}
              onChange={(e) =>
                setFacilities({
                  ...facilities,
                  drinkingWater: e.target.checked
                })
              }
              className="hidden"
            />

            💧 Water

          </label>

          <label
            className={`cursor-pointer rounded-xl border px-6 py-3 flex items-center justify-center gap-2 transition
            ${
              facilities.tissue
                ? "bg-yellow-100 border-yellow-500"
                : "bg-white border-slate-300 hover:border-yellow-400"
            }`}
          >

            <input
              type="checkbox"
              checked={facilities.tissue}
              onChange={(e) =>
                setFacilities({
                  ...facilities,
                  tissue: e.target.checked
                })
              }
              className="hidden"
            />

            🧻 Tissue

          </label>

        </div>

      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8">

        <h2 className="text-xl font-bold text-slate-900 mb-5">

          💰 Pricing & Opening Hours

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Pricing */}

          <div>

            <label className="block font-semibold text-slate-700 mb-3">

              Pricing

            </label>

            <div className="flex gap-3">

              <label
                className={`flex-1 cursor-pointer rounded-xl border px-5 py-3 flex items-center justify-center gap-2 transition
                ${
                  isFree
                    ? "bg-green-100 border-green-500"
                    : "bg-white border-slate-300"
                }`}
              >

                <input
                  type="radio"
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                  className="hidden"
                />

                🆓 Free

              </label>

              <label
                className={`flex-1 cursor-pointer rounded-xl border px-5 py-3 flex items-center justify-center gap-2 transition
                ${
                  !isFree
                    ? "bg-orange-100 border-orange-500"
                    : "bg-white border-slate-300"
                }`}
              >

                <input
                  type="radio"
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                  className="hidden"
                />

                💰 Paid

              </label>

            </div>

          </div>

          {/* Opening Hours */}

          <div>

            <label className="block font-semibold text-slate-700 mb-3">

              Opening Hours

            </label>

            <input
              type="text"
              placeholder="e.g. 24 Hours"
              value={openingHours}
              onChange={(e) =>
                setOpeningHours(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

      </div>

      {/* <h3>Upload Images</h3>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setImages([...e.target.files])
          }
        />

        <br /><br /> */}

      {/* {
        showImageUpload && (
          <>
            <h3>Upload Images</h3>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setImages([...e.target.files])
              }
            />

            <br /><br />
          </>
        )
      } */}
      {
        showImageUpload && (

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8">

            <h2 className="text-xl font-bold text-slate-900 mb-5">

              📷 Upload Images

            </h2>

            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition
              ${
                images.length > 0
                  ? "p-4"
                  : "p-10"
              }`}
            >

            <span
              className={`${
                images.length > 0
                  ? "text-2xl"
                  : "text-5xl"
              }`}
            >
              ☁️
            </span>

            <p
              className={`font-semibold ${
                images.length > 0
                  ? "mt-2 text-base"
                  : "mt-4 text-xl"
              }`}
            >
              {images.length > 0
                ? "Add More Images"
                : "Click to Upload Images"}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              JPG, PNG • Multiple Images
            </p>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImages([...e.target.files])
                }
              />

            </label>
                {
                  images.length > 0 && (

                    <div className="flex gap-4 mt-6 overflow-x-auto">

                      {
                        images.map((image, index) => (

                        <div
                          key={index}
                          className="relative w-28 h-28 flex-shrink-0 group"
                        >

                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="w-full h-full object-cover rounded-xl border border-slate-200 shadow-sm"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setImages(
                                images.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/70 hover:bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition duration-200"
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

            )
          }

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-lg font-semibold py-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
      >

        {
          loading
            ? "Saving..."
            : submitButtonText
        }

      </button>

      </form>

    </div>

  </div>

  );

}

export default ToiletForm;
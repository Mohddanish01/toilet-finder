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

  handleCurrentLocation,

  setShowMap,

  handleSubmit

}) {

  return (

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

      <button
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

      <button type="submit">
        Add Toilet
      </button>

    </form>

  );

}

export default ToiletForm;



import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Navigation,
  Eye,
  Accessibility,
  Droplets
} from "lucide-react";
import { FaMale, FaFemale, FaToiletPaper } from "react-icons/fa";
import { getDistance } from "../utils/distance";
import { ImageOff } from "lucide-react";

function ToiletCard({ toilet, position }) {

  let distance = "";

  if (position) {
    distance = getDistance(
      position.lat,
      position.lng,
      toilet.location.coordinates[1],
      toilet.location.coordinates[0]
    );
  }

  const handleDirections = (e) => {

    e.preventDefault();

    const lat = toilet.location.coordinates[1];
    const lng = toilet.location.coordinates[0];

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );

  };

  return (

    <Link to={`/toilet/${toilet._id}`}>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

        {/* Image */}

        <div className="relative h-44 bg-slate-100 overflow-hidden">

          {
            toilet.images?.length > 0 ? (

              <img
                src={`http://localhost:5000${toilet.images[0]}`}
                alt={toilet.name}
                className="w-full h-full object-cover transition duration-300 hover:scale-105"
              />

            ) : (

              // <div className="w-full h-full flex items-center justify-center text-slate-400">

              //   No Image

              // </div>
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">

                <ImageOff
                  size={48}
                  className="mb-3"
                />

                <p className="font-medium">

                  No Image Available

                </p>

              </div>

            )
          }
          <div className="absolute top-3 right-3">

          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-md">

            <Star
              size={16}
              className="text-yellow-500 fill-yellow-400"
            />

            <span className="text-sm font-semibold">

              {
                toilet.total_reviews > 0
                  ? toilet.avg_rating.toFixed(1)
                  : "New"
              }

            </span>

          </div>

          </div>

        </div>

        {/* Content */}

        <div className="p-5">

          <h2 className="text-xl font-bold text-slate-800">

            {toilet.name}

          </h2>

          {/* <div className="flex justify-between mt-3 text-sm text-slate-600">

            <div className="flex items-center gap-1">

              <Star
                size={16}
                className="text-yellow-500 fill-yellow-400"
              />

              {
                toilet.total_reviews > 0
                  ? toilet.avg_rating.toFixed(1)
                  : "New"
              }

            </div>

            <div className="flex items-center gap-1">

              <MapPin size={16} />

              {distance} away

            </div>

          </div> */}

          <div className="flex justify-end mt-3 text-sm text-slate-600">

            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">

                <MapPin size={15} />

                <span className="text-sm">
                    {distance} away
                </span>

            </div>

          </div>

          <div className="flex gap-2 mt-5">
            {toilet.facilities?.male && (

              <div className="p-2 rounded-full bg-blue-50 text-blue-600">

                <FaMale />

              </div>

            )}

            {toilet.facilities?.female && (

              <div className="p-2 rounded-full bg-blue-50 text-blue-600">

                <FaFemale />

              </div>

            )}
            
            {toilet.facilities?.wheelchair && (

              <div className="p-2 rounded-full bg-blue-50 text-blue-600">

                <Accessibility size={18} />

              </div>

            )}

            {toilet.facilities?.drinkingWater && (

              <div className="p-2 rounded-full bg-blue-50 text-blue-600">

                <Droplets size={18} />

              </div>

            )}
            
            {toilet.facilities?.tissue && (

              <div className="p-2 rounded-full bg-blue-50 text-blue-600">

                <FaToiletPaper />

              </div>

            )}

          </div>

          <p className="flex items-center gap-2 text-slate-500 text-sm mt-4">

          <MapPin size={16}/>

          {toilet.address}

          </p>

          {/* <div className="flex gap-3 mt-6">

            <button
              onClick={(e) => handleDirections(e)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >

              <Navigation size={18} />

              Directions

            </button>

            <div className="flex-1 border border-slate-300 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-700">

              <Eye size={18} />

              View

            </div>

          </div> */}
          <div className="mt-6">

            <button
              onClick={(e) => handleDirections(e)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Navigation size={18} />

              Get Directions

            </button>

          </div>

        </div>

      </div>

    </Link>

  );

}

export default ToiletCard;
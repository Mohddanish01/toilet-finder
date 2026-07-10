import { Link } from "react-router-dom";
import { ArrowRight, MapPinned } from "lucide-react";
import heroImage from "../assets/heroSection.png";

function HeroSection({ onFindNearby, onExploreMap, toilets, demands }) {

  const totalToilets = toilets.length;

  const totalDemands = demands.length;

  const avgRating =
    toilets.length
      ? (
          toilets.reduce(
            (sum, toilet) =>
              sum + (toilet.avg_rating || 0),
            0
          ) / toilets.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

              <MapPinned size={16} />

              Community Powered

            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mt-8 leading-tight">

              Find Clean
              <br />

              Public Toilets
              <br />

              Near You.

            </h1>

            <p className="text-slate-600 text-lg mt-8 leading-8 max-w-xl">

              Discover nearby public toilets,
              navigate instantly,
              report issues,
              and help improve sanitation in your city.

            </p>

            <div className="flex gap-5 mt-10">

              <button
                onClick={onFindNearby}
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                🚻 Find Nearby Toilets
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onExploreMap}
                className="border border-slate-300 hover:bg-white px-7 py-4 rounded-xl font-semibold transition"
              >
                🗺 Explore Map
              </button>

            </div>

            {/* <div className="flex flex-wrap gap-4 mt-8">

                <Link
                    to="/add-toilet"
                    className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition"
                >
                    ➕
                    <span className="font-medium">
                    Add Toilet
                    </span>
                </Link>

                <Link
                    to="/add-demand"
                    className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl hover:border-red-500 hover:shadow-md transition"
                >
                    🚩
                    <span className="font-medium">
                    Request Toilet
                    </span>
                </Link>

            </div> */}

            <div className="flex flex-wrap items-center gap-4 mt-8">

                <Link
                    to="/add-toilet"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition"
                >
                    <span>➕</span>
                    <span className="font-medium">
                    Add Toilet
                    </span>
                </Link>

                <span className="text-slate-300 text-xl">
                    •
                </span>

                <Link
                    to="/add-demand"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-red-500 hover:text-red-600 transition"
                >
                    <span>🚩</span>
                    <span className="font-medium">
                    Request Toilet
                    </span>
                </Link>

            </div>

          </div>

          {/* Right */}

            <div className="relative flex justify-center items-center">

              <div className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

              <img
                src={heroImage}
                alt="Public Toilet Finder"
                className="relative w-full max-w-[680px] object-contain drop-shadow-2xl"
              />

            </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;
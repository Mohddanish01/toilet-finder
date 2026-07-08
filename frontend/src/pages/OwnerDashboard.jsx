import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OwnerDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const { user } = useAuth();

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await api.get("/dashboard");

        setDashboard(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  const getPerformanceBadge = (rating) => {

    if (rating >= 4.5)
      return {
        text: "🟢 Excellent",
        color: "bg-green-100 text-green-700"
      };

    if (rating >= 4)
      return {
        text: "🔵 Good",
        color: "bg-blue-100 text-blue-700"
      };

    if (rating >= 3)
      return {
        text: "🟡 Average",
        color: "bg-yellow-100 text-yellow-700"
      };

    return {
      text: "🔴 Needs Improvement",
      color: "bg-red-100 text-red-700"
    };

  };

  if (!dashboard) {

    return <h2>Loading Dashboard...</h2>;

  }

  return (

  <div className="bg-slate-50 min-h-screen">

    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">

            👋 Welcome, {user?.name}

          </h1>

          <p className="text-slate-500 mt-2">

            Manage your public toilets, reviews and reported issues.

          </p>

        </div>

        <Link to="/add-toilet">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">

            ➕ Add Toilet

          </button>

        </Link>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            🚻 Total Toilets

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {dashboard.totalToilets}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            ⭐ Avg Rating

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {dashboard.averageRating}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            📝 Reviews

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {dashboard.totalReviews}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <p className="text-slate-500">

            🚨 Open Issues

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {dashboard.openIssues}

          </h2>

        </div>

      </div>

        <div>

          <div className="grid lg:grid-cols-2 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">

                  ⭐ Recent Reviews

                </h2>

                <span className="text-slate-400 text-sm">

                  Last 5

                </span>

              </div>

              {
                dashboard.recentReviews.length === 0 ? (

                  <p className="text-slate-500">

                    No reviews yet.

                  </p>

                ) : (

                  dashboard.recentReviews.map((review) => (

                    <div
                      key={review._id}
                      className="border-b border-slate-200 last:border-0 py-4"
                    >

                      <div className="flex justify-between">

                        <h3 className="font-semibold">

                          👤 {review.user_id?.name}

                        </h3>

                        <span className="text-yellow-500">

                          {"⭐".repeat(review.rating)}

                        </span>

                      </div>

                      <p className="text-slate-600 mt-2">

                        {review.comment}

                      </p>

                      <p className="text-xs text-slate-400 mt-1">

                        {
                          new Date(review.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short"
                            }
                          )
                        }

                      </p>

                      <p className="text-sm text-slate-400 mt-2">

                        🚻 {review.toilet_id?.name}

                      </p>

                    </div>

                  ))

                )
              }

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">

                  🚨 Recent Issues

                </h2>

                <span className="text-slate-400 text-sm">

                  Last 5

                </span>

              </div>

              {
                dashboard.recentIssues.length === 0 ? (

                  <p className="text-slate-500">

                    No issues reported.

                  </p>

                ) : (

                  dashboard.recentIssues.map((issue) => (

                    <div
                      key={issue._id}
                      className="border-b border-slate-200 last:border-0 py-4"
                    >

                      <div className="flex justify-between">

                        <h3 className="font-semibold">

                          {issue.status === "Resolved"
                            ? "✅"
                            : "🟡"}{" "}

                          {issue.issueType}

                        </h3>

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            issue.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >

                          {issue.status}

                        </span>

                      </div>

                      <p className="text-slate-600 mt-2">

                        {issue.description}

                      </p>

                      <p className="text-xs text-slate-400 mt-1">

                        {
                          new Date(issue.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short"
                            }
                          )
                        }

                      </p>

                      <p className="text-sm text-slate-400 mt-2">

                        🚻 {issue.toilet_id?.name}

                      </p>

                    </div>

                  ))

                )
              }

            </div>
          </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-6">

          🚻 My Toilets

        </h2>

          {
            dashboard.toilets.length === 0 ? (

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">

                <h3 className="text-2xl font-bold text-slate-800">

                  🚻 No Toilets Yet

                </h3>

                <p className="text-slate-500 mt-2">

                  Add your first public toilet to start helping your community.

                </p>

                <Link to="/add-toilet">

                  <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">

                    ➕ Add Toilet

                  </button>

                </Link>

              </div>

            ) : (

              dashboard.toilets.map((toilet) => {

                  const performance = getPerformanceBadge(
                    toilet.avg_rating
                  );

                    return (

                  <div
                    key={toilet._id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-5 hover:shadow-md transition"
                  >

                    <div className="flex justify-between items-start gap-5">

                    {/* <div>

                      <h3 className="text-2xl font-bold text-slate-900">

                        🚻 {toilet.name}

                      </h3>

                      <p className="text-slate-500 mt-2">

                        📍 {toilet.address}

                      </p>

                    </div> */}
                    <div className="flex gap-5">

                      {
                        toilet.images?.length > 0 ? (

                          <img
                            src={`http://localhost:5000${toilet.images[0]}`}
                            alt={toilet.name}
                            className="w-24 h-24 object-cover rounded-xl border border-slate-200 shadow-sm"
                          />

                        ) : (

                          <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center text-3xl border border-slate-200">

                            🚻

                          </div>

                        )
                      }

                      <div>

                        <h3 className="text-2xl font-bold text-slate-900">

                          {toilet.name}

                        </h3>

                        <p className="text-slate-500 mt-2 max-w-xl">

                          📍 {toilet.address}

                        </p>

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">

                        ⭐ {toilet.avg_rating.toFixed(1)}

                      </span>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">

                        📝 {toilet.total_reviews}

                      </span>

                        <span
                          className={`${performance.color} px-3 py-1 rounded-full text-sm font-medium`}
                        >

                          {performance.text}

                        </span>

                    </div>

                    </div>

                    <div className="flex gap-3 mt-6">

                      <Link to={`/toilet/${toilet._id}`}>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">

                          👁 View Details

                        </button>

                      </Link>

                      <Link to={`/edit-toilet/${toilet._id}`}>

                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl transition">

                          ✏ Edit

                        </button>

                      </Link>

                    </div>

                  </div>
                )

              })

            )
          }
        {/* <div
            style={{
                flex: 1,
                position: "sticky",
                top: "20px"
            }}
            >

            <h2>Overview</h2>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>🚻 Total Toilets</h3>
                <p>Owned by you</p>
                <h1>{dashboard.totalToilets}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>⭐ Average Rating</h3>
                <p>Community Rating</p>
                <h1>{dashboard.averageRating}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>📝 Total Reviews</h3>
                <p>User Reviews</p>
                <h1>{dashboard.totalReviews}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>🚨 Open Issues</h3>
                <p>Need Attention</p>
                <h1>{dashboard.openIssues}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center"
                }}
            >
                <h3>✅ Resolved Issues</h3>
                <p>Successfully Fixed</p>
                <h1>{dashboard.resolvedIssues}</h1>
            </div>

            </div> */}

      </div>

    </div>

    </div>


  );

}

export default OwnerDashboard;
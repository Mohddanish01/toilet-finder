import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ToiletDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [toilet, setToilet] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [issueType, setIssueType] = useState("Dirty");
  const [issueDescription, setIssueDescription] = useState("");
  const [issues, setIssues] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showIssues, setShowIssues] = useState(false);

  const handleDirections = () => {

    const lat = toilet.location.coordinates[1];
    const lng = toilet.location.coordinates[0];

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );

  };

  useEffect(() => {

    const fetchToilet = async () => {

      try {

        const res =
          await api.get(`/toilets/${id}`);

        setToilet(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchToilet();

  }, [id]);

  // useEffect(() => {

  //   const fetchReviews = async () => {

  //     try {

  //       const res = await api.get(
  //         `/reviews/${id}`
  //       );

  //       setReviews(res.data);

  //     } catch (error) {

  //       console.log(error);
  //     }
  //   };

  //   fetchReviews();

  // }, [id]);

  const fetchReviews = async () => {

    try {

      const res = await api.get(
        `/reviews/${id}`
      );

      console.log("Fetched Reviews:", res.data);

      setReviews(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchIssues = async () => {

    try {

      const res = await api.get(
        `/issues/${id}`
      );

      setIssues(res.data);

    } catch (error) {

      console.log(error);

    }

  };
  
  useEffect(() => {

    fetchReviews();

  }, [id]);

  useEffect(() => {

    fetchIssues();

  }, [id]);

  const handleReviewSubmit = async (e) => { // review form submition

    e.preventDefault();

      if (!comment.trim()) {
        alert("Please write a review");
        return;
      }

    try {

    //   const res = await api.post(
    //     "/reviews",
    //     {
    //       toilet_id: id,
    //       rating: Number(rating),
    //       comment
    //     }
    //   );

    // setReviews((prev) => [
    //   res.data,
    //   ...prev
    // ]);
      await api.post(
        "/reviews",
        {
          toilet_id: id,
          rating: Number(rating),
          comment
        }
      );

      console.log("Review Added");

      await fetchReviews();

      const toiletRes =
        await api.get(`/toilets/${id}`);

      setToilet(toiletRes.data);

      console.log("Reviews Refetched");

      setRating(5);
      setComment("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add review"
      );
    }
  };

  const handleIssueSubmit = async (e) => {

    e.preventDefault();

    if (!issueDescription.trim()) {
      alert("Please describe the issue");
      return;
    }

    try {

      await api.post("/issues", {

        toilet_id: id,

        issueType,

        description: issueDescription

      });

      alert("Issue reported successfully");

      setIssueType("Dirty");
      setIssueDescription("");

      await fetchIssues();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to report issue"
      );

    }

  };

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this toilet?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(`/toilets/${id}`);

      alert("Toilet deleted successfully");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete toilet"
      );

    }

  };

  const handleResolveIssue = async (issueId) => {

  try {

    await api.put(`/issues/${issueId}`, {

      status: "Resolved"

    });

    alert("Issue marked as resolved");

    fetchIssues();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update issue"
    );

  }

};

  if (!toilet) {
    return <h1>Loading...</h1>;
  }

  console.log("Current Reviews State:", reviews);

  return (

  <div className="bg-slate-50 min-h-screen">

    <div className="max-w-7xl mx-auto px-6 py-6">

      {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"> */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
      <div className="flex items-start justify-between gap-6 mb-1">

        {/* <div>

          <h1 className="text-5xl font-bold text-slate-900">

            🚻 {toilet.name}

          </h1>

          <p className="text-slate-500 text-lg mt-3">

            📍 {toilet.address}

          </p>

        </div> */}
        <div>

          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">

            🚻 {toilet.name}

          </h1>

          <p className="text-slate-500 mt-2">

            📍 {toilet.address}

          </p>

        </div>

        <div className="flex flex-col items-end gap-3">

        {/* Rating + Reviews */}

        <div className="flex items-center gap-3">

          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-semibold">

            ⭐ {toilet.avg_rating?.toFixed(1)}

          </div>

          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">

            📝 {toilet.total_reviews} Reviews

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={handleDirections}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition"
          >
            🧭 Directions
          </button>

          {
            user &&
            toilet.created_by === user._id && (

              <>
                <Link to={`/edit-toilet/${toilet._id}`}>

                  <button
                    className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl font-medium transition"
                  >
                    ✏️ Edit
                  </button>

                </Link>

                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                >
                  🗑 Delete
                </button>

              </>

            )
          }

        </div>

      </div>

      </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">

      <h2 className="text-2xl font-bold text-slate-900 mb-4">

        📷 Photos

      </h2>

      {
        toilet.images?.length > 0 ? (

          <div className="flex gap-4 overflow-x-auto pb-2 mb-2">

            {
              toilet.images.map((image, index) => (

                <img
                  key={index}
                  src={`http://localhost:5000${image}`}
                  alt={`Toilet ${index + 1}`}
                  className="w-60 h-36 object-cover rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 flex-shrink-0 cursor-pointer"
                />

              ))
            }

          </div>

        ) : (

          <div className="bg-slate-100 h-36 rounded-xl flex items-center justify-center text-slate-500 mb-8">

            📷 No Images Available

          </div>

        )
      }

      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        ✨ Facilities
      </h2>

        <div className="flex flex-wrap gap-3 mb-3">

          {
            toilet.facilities?.male && (

              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

                <span>🚹</span>

                <span>Male</span>

              </div>

            )
          }

          {
            toilet.facilities?.female && (

              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

                <span>🚺</span>

                <span>Female</span>

              </div>

            )
          }

          {
            toilet.facilities?.wheelchair && (

              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

                <span>♿</span>

                <span>Accessible</span>

              </div>

            )
          }

          {
            toilet.facilities?.drinkingWater && (

              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

                <span>💧</span>

                <span>Water</span>

              </div>

            )
          }

          {
            toilet.facilities?.tissue && (

              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

                <span>🧻</span>

                <span>Tissue</span>

              </div>

            )
          }

          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

            <span>{toilet.isFree ? "🆓" : "💰"}</span>

            <span>{toilet.isFree ? "Free" : "Paid"}</span>

          </div>

          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium shadow-sm hover:border-blue-400 hover:text-blue-600 transition">

            <span>🕒</span>

            <span>{toilet.openingHours}</span>

          </div>

        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-6 items-start mb-10">

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4">

        <h2 className="text-lg font-bold text-slate-900 mb-5">

          🚨 Report an Issue

        </h2>

          {
            user ? (
            <form onSubmit={handleIssueSubmit}>

              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option>Dirty</option>
                <option>No Water</option>
                <option>Broken Flush</option>
                <option>No Tissue</option>
                <option>Bad Smell</option>
                <option>Closed</option>
                <option>Poor Lighting</option>
                <option>Other</option>

              </select>

              {/* <br /><br /> */}

              <textarea
                placeholder="Describe the issue..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows={2}
                className="w-full mt-4 border border-slate-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* <br /><br /> */}

              <button
                type="submit"
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition"
              >
                🚨 Report Issue
              </button>

            </form>
            ) : (

              <div className="text-center py-6">

                <p className="text-slate-500 mb-4">

                  Login to report an issue.

                </p>

                <Link
                  to="/login"
                  className="inline-block bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
                >
                  🔒 Login
                </Link>

              </div>

            )
          }

      </div>


      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4">

        <h2 className="text-lg font-bold text-slate-900 mb-5">

          ⭐ Add Review

        </h2>
        {
          user ? (

          <form onSubmit={handleReviewSubmit}>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (1-5)"
            className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

         <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            className="w-full mt-4 border border-slate-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition"
          >
            ⭐ Submit Review
          </button>

        </form>

          ) : (

            <div className="text-center py-6">

              <p className="text-slate-500 mb-4">

                Login to share your experience.

              </p>

              <Link
                to="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
              >
                🔒 Login
              </Link>

            </div>

          )
        }
        </div>
      </div>

      {/* ===================== Reviews ===================== */}

      {
        user ? (

          <>
            <div
              onClick={() => setShowReviews(!showReviews)}
              className="flex justify-between items-center cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 px-5 py-4 mt-6"
            >

              <h2 className="text-xl font-bold">
                ⭐ Reviews ({reviews.length})
              </h2>

              <span className="text-xl">
                {showReviews ? "▲" : "▼"}
              </span>

            </div>

            {
              showReviews && (

                reviews.length === 0 ? (

                  <div className="bg-white rounded-xl border border-slate-200 p-5 mt-3 text-slate-500">
                    No reviews yet.
                  </div>

                ) : (

                  reviews.map((review) => (

                    <div
                      key={review._id}
                      className="bg-white rounded-xl border border-slate-200 p-4 mt-3"
                    >

                      <p className="font-semibold">
                        ⭐ {review.rating}/5
                      </p>

                      <p className="mt-2 text-slate-600">
                        {review.comment}
                      </p>

                    </div>

                  ))

                )

              )
            }

          </>

        ) : (

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-5 py-6 mt-6 text-center">

            <h2 className="text-xl font-bold mb-3">
              ⭐ Reviews
            </h2>

            <p className="text-slate-500 mb-4">
              Login to view reviews.
            </p>

            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              🔒 Login
            </Link>

          </div>

        )
      }

      {/* ===================== Reported Issues ===================== */}

      {
        user ? (

          <>
            <div
              onClick={() => setShowIssues(!showIssues)}
              className="flex justify-between items-center cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 px-5 py-4 mt-6"
            >

              <h2 className="text-xl font-bold">
                🚨 Reported Issues ({issues.length})
              </h2>

              <span className="text-xl">
                {showIssues ? "▲" : "▼"}
              </span>

            </div>

            {
              showIssues && (

                issues.length === 0 ? (

                  <div className="bg-white rounded-xl border border-slate-200 p-5 mt-3 text-slate-500">
                    No issues reported.
                  </div>

                ) : (

                  issues.map((issue) => (

                    <div
                      key={issue._id}
                      className="bg-white rounded-xl border border-slate-200 p-4 mt-3"
                    >

                      <p>
                        <strong>Issue:</strong> {issue.issueType}
                      </p>

                      <p className="mt-2">
                        <strong>Description:</strong> {issue.description}
                      </p>

                      <p className="mt-2">
                        <strong>Status:</strong>{" "}
                        {issue.status === "Resolved"
                          ? "✅ Resolved"
                          : "🟡 Open"}
                      </p>

                      <p className="mt-2">
                        <strong>Reported By:</strong>{" "}
                        {issue.reported_by?.name}
                      </p>

                      {
                        toilet.created_by === user._id &&
                        issue.status !== "Resolved" && (

                          <button
                            onClick={() => handleResolveIssue(issue._id)}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                          >
                            ✔ Mark as Resolved
                          </button>

                        )
                      }

                    </div>

                  ))

                )

              )
            }

          </>

        ) : (

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-5 py-6 mt-6 text-center">

            <h2 className="text-xl font-bold mb-3">
              🚨 Reported Issues
            </h2>

            <p className="text-slate-500 mb-4">
              Login to view reported issues.
            </p>

            <Link
              to="/login"
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              🔒 Login
            </Link>

          </div>

        )
      }
      
    </div>
    </div>
  );
}

export default ToiletDetails;

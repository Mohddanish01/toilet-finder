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
    <div>

      <h1>{toilet.name}</h1>

      <p>
        {toilet.address}
      </p>

      <h3>Images</h3>

      {
        toilet.images?.length > 0 ? (

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px"
            }}
          >

            {
              toilet.images.map((image, index) => (

                <img
                  key={index}
                  src={`http://localhost:5000${image}`}
                  alt={`Toilet ${index + 1}`}
                  width="220"
                  height="160"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #ccc"
                  }}
                />

              ))
            }

          </div>

        ) : (

          <p>No Images Available</p>

        )
      }

      <h3>Facilities</h3>

        {toilet.facilities?.male && <p>🚹 Male Toilet</p>}

        {toilet.facilities?.female && <p>🚺 Female Toilet</p>}

        {toilet.facilities?.wheelchair && (
          <p>♿ Wheelchair Accessible</p>
        )}

        {toilet.facilities?.drinkingWater && (
          <p>💧 Drinking Water</p>
        )}

        {toilet.facilities?.tissue && (
          <p>🧻 Tissue Available</p>
        )}

        <p>
          💰 {toilet.isFree ? "Free" : "Paid"}
        </p>

        <p>
          🕒 {toilet.openingHours}
        </p>

      <p>
        Average Rating:
        {toilet.avg_rating?.toFixed(1)}
      </p>

      <p>
        Total Reviews:
        {toilet.total_reviews}
      </p>

      <br />

      <button
        onClick={handleDirections}
      >
        🧭 Get Directions
      </button>

      {
        user &&
        toilet.created_by === user._id && (

          <>

            <br /><br />

            <Link to={`/edit-toilet/${toilet._id}`}>

              <button>
                ✏️ Edit Toilet
              </button>

            </Link>

            <button
              onClick={handleDelete}
              style={{ marginLeft: "10px" }}
            >
              🗑 Delete Toilet
            </button>

          </>

        )
      }

      <h2>🚨 Report an Issue</h2>

        <form onSubmit={handleIssueSubmit}>

          <select
            value={issueType}
            onChange={(e) =>
              setIssueType(e.target.value)
            }
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

          <br /><br />

          <textarea
            placeholder="Describe the issue..."
            value={issueDescription}
            onChange={(e) =>
              setIssueDescription(e.target.value)
            }
          />

          <br /><br />

          <button type="submit">

            🚨 Report Issue

          </button>

        </form>

        <br />

      <h2>Add Review</h2>

      <form onSubmit={handleReviewSubmit}>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
        />

        <br /><br />

        <textarea
          placeholder="Write your review"
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Submit Review
        </button>

      </form>

      <h2>Reviews</h2>

      {
        reviews.length === 0
        ? (
            <p>No reviews yet</p>
          )
        : (
            reviews.map((review) => (

              <div key={review._id}>

                <p>
                  Rating: {review.rating}
                </p>

                <p>
                  {review.comment}
                </p>

              </div>

            ))
          )
      }

      <h2>🚨 Reported Issues</h2>

      {
        issues.length === 0 ? (

          <p>No issues reported.</p>

        ) : (

          issues.map((issue) => (

            <div
              key={issue._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px"
              }}
            >

              <p>
                <strong>Issue:</strong> {issue.issueType}
              </p>

              <p>
                <strong>Description:</strong> {issue.description}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {
                  issue.status === "Resolved"
                    ? "✅ Resolved"
                    : "🟡 Open"
                }
              </p>

              <p>
                <strong>Reported By:</strong> {issue.reported_by?.name}
              </p>

              {
                user &&
                toilet.created_by === user._id &&
                issue.status !== "Resolved" && (

                  <button
                    onClick={() =>
                      handleResolveIssue(issue._id)
                    }
                  >
                    ✔ Mark as Resolved
                  </button>

                )
              }

            </div>

          ))

        )
      }
      
    </div>
  );
}

export default ToiletDetails;

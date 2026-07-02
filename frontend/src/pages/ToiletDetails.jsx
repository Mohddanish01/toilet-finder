import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ToiletDetails() {

  const { id } = useParams();

  const { user } = useAuth();

  const [toilet, setToilet] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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
  
  useEffect(() => {

    fetchReviews();

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

          </>

        )
      }

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

    </div>
  );
}

export default ToiletDetails;

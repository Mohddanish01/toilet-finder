import Review from "../models/Review.js";
import Toilet from "../models/Toilet.js";

const updateToiletRating = async (toiletId) => {

  const reviews = await Review.find({
    toilet_id: toiletId
  });

  const totalReviews = reviews.length;

  let avgRating = 0;

  if (totalReviews > 0) {
    avgRating =
      reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      ) / totalReviews;
  }

  await Toilet.findByIdAndUpdate(
    toiletId,
    {
      avg_rating: avgRating,
      total_reviews: totalReviews
    }
  );
};

export default updateToiletRating;
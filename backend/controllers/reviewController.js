import Review from "../models/Review.js";
import Toilet from "../models/Toilet.js";

export const addReview = async (req, res) => {
  try {
    const { toilet_id, rating, comment } = req.body;

    const review = await Review.create({
      toilet_id,
      rating,
      comment
    });

    const reviews = await Review.find({ toilet_id });

    const totalReviews = reviews.length;

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) /
      totalReviews;

    await Toilet.findByIdAndUpdate(
      toilet_id,
      {
        avg_rating: avgRating,
        total_reviews: totalReviews
      }
    );

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
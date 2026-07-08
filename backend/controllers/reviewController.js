import Review from "../models/Review.js";
import Toilet from "../models/Toilet.js";
import updateToiletRating from "../utils/updateToiletRating.js";

export const addReview = async (req, res) => {
  try {
    const { toilet_id, rating, comment } = req.body;

    const existingReview = await Review.findOne({
      toilet_id,
      user_id: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this toilet"
      });
    }

    const review = await Review.create({
      toilet_id,
      user_id: req.user._id,
      rating,
      comment
    });

    // const reviews = await Review.find({ toilet_id });

    // const totalReviews = reviews.length;

    // const avgRating =
    //   reviews.reduce((sum, r) => sum + r.rating, 0) /
    //   totalReviews;

    // await Toilet.findByIdAndUpdate(
    //   toilet_id,
    //   {
    //     avg_rating: avgRating,
    //     total_reviews: totalReviews
    //   }
    // );
    await updateToiletRating(toilet_id);

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getReviewsByToiletId = async (req, res) => {
  try {
    const reviews = await Review.find({
  toilet_id: req.params.toiletId
  })
  .populate("user_id", "name")
  .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    if (
      review.user_id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    review.rating =
      rating || review.rating;

    review.comment =
      comment || review.comment;

    await review.save();

    await updateToiletRating(
      review.toilet_id
    );

    res.status(200).json(review);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteReview = async (
  req,
  res
) => {
  try {

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    if (
      review.user_id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await review.deleteOne();

    await updateToiletRating(
      review.toilet_id
    );

    res.status(200).json({
      message: "Review deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
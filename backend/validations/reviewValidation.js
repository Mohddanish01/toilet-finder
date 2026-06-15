import { body } from "express-validator";

export const createReviewValidation = [
  body("toilet_id")
    .notEmpty()
    .withMessage("Toilet ID is required")
    .isMongoId()
    .withMessage("Invalid Toilet ID"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters")
];
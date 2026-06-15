import { body } from "express-validator";

export const createToiletValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Toilet name is required"),

  body("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),

  body("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
];
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  toilet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toilet",
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  comment: {
    type: String,
    trim: true
  }

}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
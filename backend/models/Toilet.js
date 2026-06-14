import mongoose from "mongoose";

const toiletSchema = new mongoose.Schema({
  name: String,
  
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number] // [lng, lat]
  },

  address: String,
  images: [String],

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  avg_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 }

}, { timestamps: true });

toiletSchema.index({ location: "2dsphere" });

export default mongoose.model("Toilet", toiletSchema);
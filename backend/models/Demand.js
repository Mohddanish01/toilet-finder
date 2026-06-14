import mongoose from "mongoose";

const demandSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number]
  },

  votes: { type: Number, default: 1 }

}, { timestamps: true });

demandSchema.index({ location: "2dsphere" });

export default mongoose.model("Demand", demandSchema);
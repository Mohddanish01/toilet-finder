import mongoose from "mongoose";

const demandSchema = new mongoose.Schema(
{
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  votes: {
    type: Number,
    default: 1
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  votedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]

},
{
  timestamps: true
});

demandSchema.index({
  location: "2dsphere"
});

export default mongoose.model(
  "Demand",
  demandSchema
);
import mongoose from "mongoose";

const issueReportSchema = new mongoose.Schema({

  toilet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toilet",
    required: true
  },

  reported_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  issueType: {
    type: String,
    enum: [
      "Dirty",
      "No Water",
      "Broken Flush",
      "No Tissue",
      "Bad Smell",
      "Closed",
      "Poor Lighting",
      "Other"
    ],
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: [
      "Open",
      "In Progress",
      "Resolved"
    ],
    default: "Open"
  }

}, { timestamps: true });

export default mongoose.model(
  "IssueReport",
  issueReportSchema
);
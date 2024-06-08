import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
  targetParamValue: String,
});

const LinksSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  clicks: [ClickSchema],
  targetParamName: {
    type: String,
    default: "t",
  },
  targetValues: [
    {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Links", LinksSchema);

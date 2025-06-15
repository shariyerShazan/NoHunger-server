import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pickLocation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expriredIn: {
    type: Number,
    required: true,
  },
  additionalNotes: {
    type: String,
    required: true,
  },
  foodStatus: {
    type: String,
    enum: ["Available", "Not available"],
  },
  postedBy: {
    type: String ,
    required: true
  },
});

export const Food = mongoose.model("Food", FoodSchema);

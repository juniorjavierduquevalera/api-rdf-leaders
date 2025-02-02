import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "El mensaje debe tener al menos 10 caracteres."],
    },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema, "reviews");

export default Review;

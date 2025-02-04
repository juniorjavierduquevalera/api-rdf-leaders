import { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
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
      minlength: [2, "El mensaje debe tener al menos 2 caracteres."],
    },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema, "reviews");

export default Review;

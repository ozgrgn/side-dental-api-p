import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    reviewName: { type: String, required: false },
    reviewDate: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, required: false, default:0 },
    reviewDate: { type: String, default: false },
    reviewPlatform: { type: String, default: false },
    reviewText: { type: String, default: false },
    reviewStars: { type: String, default: false },
    reviewLink: { type: String, default: false }
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", ReviewSchema);

export default {
  Review,
};

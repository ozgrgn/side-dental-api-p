import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    backgroundBanner: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    mobileBanner: { type: String, required: true },
    order: { type: Number, required: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Slider = mongoose.model("Slider", SliderSchema);

export default {
  Slider,
};

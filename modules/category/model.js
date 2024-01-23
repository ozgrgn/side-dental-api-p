import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: { type: Object, default: {} },
    name: { type: Object, default: {} }, //Object for multi language
    order: { type: Object, default: {} },
    isActive: { type: Object, default: {} },
    heroImage: { type: String, requried: false },
    mobileImage: { type: String, requried: false },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", CategorySchema);

export default {
  Category,
};

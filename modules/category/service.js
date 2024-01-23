import Model from "./model.js";

const getCategories = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const categories = await Model.Category.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.Category.countDocuments(query);

  return { categories, count };
};

const getCategory = async (query) => {
  return Model.Category.findOne(query);
};

const addCategory = async (
  title,
  name,
  order,
  isActive,
  heroImage,
  mobileImage
) => {
  try {
    let isExistCategory = await Model.Category.findOne({ title });

    if (isExistCategory) {
      throw new Error(
        JSON.stringify({
          en: "Category is already exists.",
          tr: "Category zaten kayıtlı.",
        })
      );
    }

    return new Model.Category({
      title,
      name,
      order,
      isActive,
      heroImage,
      mobileImage,
    }).save();
  } catch (error) {
    console.log("addCategory service error", error);
    throw new Error(error.message);
  }
};

const updateCategory = async (categoryId, category) => {
  try {
    let isExistCategory = await Model.Category.findById(categoryId);

    if (!isExistCategory) {
      throw new Error(
        JSON.stringify({
          en: "Category is not found.",
          tr: "Category bulunamadı.",
        })
      );
    }

    return Model.Category.findOneAndUpdate(
      { _id: isExistCategory._id },
      { ...category },
      { new: true }
    );
  } catch (error) {
    console.log("updateCategory service error", error);
    throw new Error(error.message);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    return Model.Category.deleteOne({ _id: categoryId });
  } catch (error) {
    console.log("deleteCategory service error", error);
    throw new Error(error.message);
  }
};
const getCategoryViaPerma = async (categoryPerma, lang) => {
  return Model.Category.findOne({ [`name.${lang}`]: categoryPerma });

};

export default {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getCategoryViaPerma,
};

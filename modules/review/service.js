import Model from "./model.js";

const getReviews = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const reviews = await Model.Review.find(query, {}, queryOptions).sort({
    order: 1,
  })
  const count = await Model.Review.countDocuments(query);

  return { reviews, count };
};

const getReview = async (query) => {
  console.log(query, "servis query")
  return Model.Review.findOne(query);
};

const addReview = async (
  lang,
  reviewName,
  reviewDate,
  reviewPlatform,
  reviewText,
  reviewStars,
  reviewLink,
  isActive,
  order
) => {
  try {
    return new Model.Review({
      lang,
      reviewName,
      reviewDate,
      reviewPlatform,
      reviewText,
      reviewStars,
      reviewLink,
      isActive,
      order
    }).save();
  } catch (error) {
    console.log("addReview service error", error);
    throw new Error(error.message);
  }
};

const updateReview = async (reviewId, review) => {
  try {
    let isExistReview = await Model.Review.findById(reviewId);

    if (!isExistReview) {
      throw new Error(
        JSON.stringify({
          en: "Review is not found.",
          tr: "Review bulunamadı.",
        })
      );
    }

    return Model.Review.findOneAndUpdate(
      { _id: isExistReview._id },
      { ...review },
      { new: true }
    );
  } catch (error) {
    console.log("updateReview service error", error);
    throw new Error(error.message);
  }
};

const deleteReview = async (reviewId) => {
  try {
    return Model.Review.deleteOne({ _id: reviewId });
  } catch (error) {
    console.log("deleteReview service error", error);
    throw new Error(error.message);
  }
};

export default {
  addReview,
  updateReview,
  deleteReview,
  getReviews,
  getReview
};

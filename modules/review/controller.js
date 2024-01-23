import Service from "./service.js";
import _ from "lodash";
const addReview = async (req, res) => {
  const {
    lang,
    reviewName,
    reviewDate,
    reviewPlatform,
    reviewText,
    reviewStars,
    reviewLink,
    isActive,
    order
  } = req.body;

  try {
    let review = await Service.addReview(
      lang,
      reviewName,
      reviewDate,
      reviewPlatform,
      reviewText,
      reviewStars,
      reviewLink,
      isActive,
      order
    );

    return res.json({
      status: true,
      review,
    });
  } catch (error) {
    console.log(error.message, "addReview error");
    return res.json({ status: false, message: error.message });
  }
};

const updateReview = async (req, res) => {
  const { review } = req.body;
  const { reviewId } = req.params;
  console.log(review, "sdsfsfsdfsdsf");
  try {
    let updatedReview = await Service.updateReview(
      reviewId,
      review
    );

    return res.json({
      status: true,
      updatedReview,
    });
  } catch (error) {
    console.log(error.message, "updateReview error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    await Service.deleteReview(reviewId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteReview error");
    return res.json({ status: false, message: error.message });
  }
};

const getReviews = async (req, res) => {
  const { limit, skip, lang, treatment, isActive,general} = req.query;

  try {
    const reviewsQuery = _.omitBy(
      {
        lang,
        isActive,
        treatment,
        general
      },
      (a) => a === undefined
    );
    let reviews = await Service.getReviews(reviewsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...reviews });
  } catch (error) {
    console.log(error.message, "getReviews error");
    return res.json({ status: false, message: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const ReviewQuery = _.omitBy(
      {
        _id: req.params.reviewId,
      },
      (a) => a === undefined
    );

    let review = await Service.getReview(ReviewQuery);
    return res.json({ status: true, review });
  } catch (error) {
    console.log(error.message, "getReview error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addReview,
  updateReview,
  deleteReview,
  getReviews,
  getReview
};

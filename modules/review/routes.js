import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.reviews.create_review],
  }),
  body(["lang"]).exists(),
  body([
    "reviewName",
    "reviewDate",
    "reviewPlatform",
    "reviewText",
    "reviewLink",
    "reviewStars",
    "isActive",
    "order"
  ]).optional(),
  validator,
  Controller.addReview
);

router.put(
  "/:reviewId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.reviews.update_review],
  }),
  param("reviewId").exists(),
  body(["review"]).exists(),
  validator,
  Controller.updateReview
);

router.delete(
  "/:reviewId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.reviews.delete_review],
  }),
  param("reviewId").exists(),
  validator,
  Controller.deleteReview
);

router.get(
  "/",
  query(["isActive", "lang", "treatment","general"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getReviews
);

router.get(
  "/:reviewId",
  param("reviewId").exists(),
  validator,
  Controller.getReview
);
export default router;

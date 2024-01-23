import express from "express";
const router = express.Router();
import Controller from "./controller.js"
import { body, query, param } from "express-validator"
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js"
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.categories.create_category] }),
  body(["title", "name",]).exists(),
  body(["isActive", "order","heroImage","mobileImage"]).optional(),
  validator,
  Controller.addCategory
);

router.put(
  "/:categoryId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.categories.update_category] }),
  param("categoryId").exists(),
  body(["category"]).exists(),
  validator,
  Controller.updateCategory
);

router.delete(
  "/:categoryId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.categories.delete_category] }),
  param("categoryId").exists(),
  validator,
  Controller.deleteCategory
);

router.get(
  "/",
  query(["startDate", "endDate"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getCategories
);

router.get(
  "/:categoryId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.categories.read_category] }),
  param("categoryId").exists(),
  validator,
  Controller.getCategory
);

router.get(
  "/categoryPerma/:categoryPerma/:lang",
  param(["lang","categoryPerma"]).exists(),
  validator,
  Controller.getCategoryViaPerma
);

export default router;

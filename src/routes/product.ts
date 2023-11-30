import express from "express";
import ensureAuthenticated from "../middlewares/auth";
import validateResource from "../middlewares/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../validation/product.schema";
import {
  createProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/",
  [ensureAuthenticated, validateResource(createProductSchema)],
  createProductHandler
);

router.put(
  "/:productId",
  [ensureAuthenticated, validateResource(updateProductSchema)],
  updateProductHandler
);

router.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductHandler
);

router.delete(
  "/:productId",
  [ensureAuthenticated, validateResource(deleteProductSchema)],
  getProductHandler
);

// router.get("/", ensureAuthenticated, getProductsHandler);

export default router;

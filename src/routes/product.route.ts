import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getProductByCategoryAndPrice,
  getSingleProduct,
  rateAProduct,
  updateProduct,
} from "../product/product.controller";

export const productRouter = Router();

productRouter.get("/product/getAllCategories", getAllCategories);
productRouter.get("/product/getSingleProduct/:id", getSingleProduct);
productRouter.get(
  "/product/getAllProductByCategoryAndPrice/:category&&:price",
  getProductByCategoryAndPrice
);
productRouter.get("/product/getAllProducts/:limit&&:offset", getAllProducts);
productRouter.post("/product/rateProduct", rateAProduct);
productRouter.post("/product/addProduct", addProduct);
productRouter.post("/product/deleteProduct/:product_id", deleteProduct);
productRouter.post("/product/updateProduct", updateProduct);

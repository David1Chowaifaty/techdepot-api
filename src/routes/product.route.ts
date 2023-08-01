import { Router } from "express";
import {getAllCategories,  getProductByCategoryAndPrice, getSingleProduct } from "../product/product.controller"

export const productRouter = Router();

productRouter.get("/product/getAllCategories" , getAllCategories )
productRouter.get("/product/getSingleProduct/:id" , getSingleProduct);
productRouter.get("/product/getProductByCategoryAndPrice/:category&&:price",getProductByCategoryAndPrice)



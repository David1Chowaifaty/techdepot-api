import { Router } from "express";
import {getAllCategories, getProductByCategory, getProductByCategoryAndPrice, getSingleProduct } from "../product/product.controller"

export const productRouter = Router();

productRouter.get("/product/getAllCategories" , getAllCategories )
productRouter.get("/product/getSingleProduct/:id" , getSingleProduct);
productRouter.get("/product/getProductByCategory/:category" , getProductByCategory);
productRouter.get("/product/getProductByCategoryAndPrice/:category&&:price",getProductByCategoryAndPrice)



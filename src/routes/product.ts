import { Router } from "express";
import {getAllCategories, getSingleProduct } from "../product/product.controller"

export const productRouter = Router();

productRouter.get("/product/getAllCategories" , getAllCategories )
productRouter.get("/product/getSingleProduct/:id" , getSingleProduct);



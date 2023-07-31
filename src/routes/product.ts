import { Router } from "express";
import {getAllCategories} from "../product/product.controller"

export const productRouter = Router();

productRouter.get("/product/getAllCategories" , getAllCategories )

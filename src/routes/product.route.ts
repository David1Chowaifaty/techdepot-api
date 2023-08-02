import { Router } from "express";
import {addProduct, deleteProduct, getAllCategories,  getProductByCategoryAndPrice, getSingleProduct, rateAProduct, updateProduct } from "../product/product.controller"

export const productRouter = Router();

productRouter.get("/product/getAllCategories" , getAllCategories )
productRouter.get("/product/getSingleProduct/:id" , getSingleProduct);
productRouter.get("/product/getProductByCategoryAndPrice/:category&&:price",getProductByCategoryAndPrice)
productRouter.post("/product/rateProduct" , rateAProduct )
productRouter.post("/product/addProduct", addProduct)
productRouter.post("/product/deleteProduct/:product_id",deleteProduct)
productRouter.post("/product/updateProduct", updateProduct)

import { Router } from "express";
import { productRouter } from "./product";

export const router = Router();
router.use(productRouter)


import { Router } from "express";
import { authRouter } from "./auth.route";
import { productRouter } from "./product.route";
import { favoriteProductRouter } from "./favorite.route";

export const router = Router();
router.use(authRouter);
router.use(favoriteProductRouter);
router.use(productRouter);

import { Router } from "express";
import { authRouter } from "./auth";
import { productRouter } from "./product";

export const router = Router();
router.use(authRouter);

router.use(productRouter)


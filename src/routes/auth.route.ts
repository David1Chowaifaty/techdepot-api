import { Router } from "express";
import { login, register } from "../auth/auth.controller";

export const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", register);

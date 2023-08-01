import { Router } from "express";
import { getAllUsers, login, register } from "../auth/auth.controller";

export const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", register);
authRouter.get("/auth/getAllUsers", getAllUsers);

import { Request, Response } from "express";
import { Connection } from "mysql2";
import { ZodError, z } from "zod";
import { Login, Register } from "./auth.service";
import { AuthError } from "./AuthError";
import jwt from "jsonwebtoken";
export async function login(req: Request, res: Response) {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[a-z\d@$!.%*?&]+$/),
    });
    const connection: Connection = req.app.get("connection");
    const { email, password } = loginSchema.parse(req.body);
    const { user_id, firstname, lastname } = (await Login(
      connection,
      email,
      password
    )) as {
      user_id: number;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      role: "user";
    };
    const token = jwt.sign(
      { user_id, firstname, lastname, email, role: "user" },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1800s" }
    );
    res.cookie("auth-token", token, {
      maxAge: 3600000,
      path: "/",
      secure: false,
      domain: "localhost",
    });
    res.send({ user_id, firstname, lastname, email });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    } else if (error instanceof AuthError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
}
export async function register(req: Request, res: Response) {
  try {
    const registerSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[a-z\d@$!.%*?&]+$/),
      firstname: z.string(),
      lastname: z.string(),
    });
    const connection: Connection = req.app.get("connection");
    const { email, password, firstname, lastname } = registerSchema.parse(
      req.body
    );
    const _result = await Register(
      connection,
      email,
      password,
      firstname,
      lastname
    );
    res.status(201).send("success");
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    } else if (error instanceof AuthError) {
      res.status(400).send(error.message);
    } else {
      res.send(500).send(error);
    }
  }
}

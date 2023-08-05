import { Request, Response } from "express";
import { Connection } from "mysql2";
import { ZodError, z } from "zod";
import { GetAllOrders } from "./order.service";

export function addOrder(req: Request, res: Response) {}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const connection: Connection = req.app.get("connection");
    const _result = await GetAllOrders(connection);
  } catch (error) {}
}

export function finishOrder(req: Request, res: Response) {}

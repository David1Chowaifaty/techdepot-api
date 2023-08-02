import { Request, Response } from "express";
import {
  AddToFavorite,
  GetAllFavorite,
  RemoveFromFavorite,
} from "./favorite.service";
import { ZodError, z } from "zod";
import { Connection } from "mysql2";
import { FavoriteError } from "./favoriteError";

export async function addToFavorite(req: Request, res: Response) {
  try {
    const favoriteProductScheme = z.object({
      user_id: z.coerce.number(),
      product_id: z.coerce.number(),
    });
    let { product_id, user_id } = favoriteProductScheme.parse(req.body);
    const connection: Connection = req.app.get("connection");
    let result = await AddToFavorite(connection, user_id, product_id);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    } else if (error instanceof FavoriteError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
}
export async function removeFromFavorite(req: Request, res: Response) {
  try {
    const favoriteProductScheme = z.object({
      favorite_id: z.coerce.number(),
    });
    let { favorite_id } = favoriteProductScheme.parse(req.params);
    const connection: Connection = req.app.get("connection");
    let result = await RemoveFromFavorite(connection, favorite_id);
    res.status(204).send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    }
    res.status(500).send(error);
  }
}

export async function getAllFavorite(req: Request, res: Response) {
  try {
    const favoriteProductScheme = z.object({
      id: z.coerce.number(),
    });
    let { id } = favoriteProductScheme.parse(req.params);
    const connection: Connection = req.app.get("connection");
    let result = await GetAllFavorite(connection, id);
    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    }
    res.status(500).send(error);
  }
}

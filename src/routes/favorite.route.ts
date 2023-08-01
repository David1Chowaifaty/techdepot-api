import { Router } from "express";
import {
  addToFavorite,
  getAllFavorite,
  removeFromFavorite,
} from "../favorite/favorite.controller";

export const favoriteProductRouter = Router();

favoriteProductRouter.get("/favorite/getAllFavorite/:id", getAllFavorite);
favoriteProductRouter.post("/favorite/addToFavorite", addToFavorite);
favoriteProductRouter.delete(
  "/favorite/removeFromFavorite/:favorite_id",
  removeFromFavorite
);

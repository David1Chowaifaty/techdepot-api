"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteProductRouter = void 0;
var express_1 = require("express");
var favorite_controller_1 = require("../favorite/favorite.controller");
exports.favoriteProductRouter = (0, express_1.Router)();
exports.favoriteProductRouter.get("/favorite/getAllFavorite/:id", favorite_controller_1.getAllFavorite);
exports.favoriteProductRouter.post("/favorite/addToFavorite", favorite_controller_1.addToFavorite);
exports.favoriteProductRouter.delete("/favorite/removeFromFavorite/:favorite_id", favorite_controller_1.removeFromFavorite);

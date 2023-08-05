"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var auth_route_1 = require("./auth.route");
var product_route_1 = require("./product.route");
var favorite_route_1 = require("./favorite.route");
exports.router = (0, express_1.Router)();
exports.router.use(auth_route_1.authRouter);
exports.router.use(favorite_route_1.favoriteProductRouter);
exports.router.use(product_route_1.productRouter);
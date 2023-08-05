"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = require("express");
var product_controller_1 = require("../product/product.controller");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/product/getAllCategories", product_controller_1.getAllCategories);
exports.productRouter.get("/product/getSingleProduct/:id", product_controller_1.getSingleProduct);
exports.productRouter.get("/product/getProductByCategoryAndPrice/:category&&:price", product_controller_1.getProductByCategoryAndPrice);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var auth_controller_1 = require("../auth/auth.controller");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/auth/login", auth_controller_1.login);
exports.authRouter.post("/auth/register", auth_controller_1.register);
exports.authRouter.get("/auth/getAllUsers", auth_controller_1.getAllUsers);

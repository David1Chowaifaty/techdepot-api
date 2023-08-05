"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var mysql2_1 = __importDefault(require("mysql2"));
var routes_1 = require("./routes");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
var connection = mysql2_1.default.createConnection(process.env.DATABASE_URL || "");
app.set("connection", connection);
var PORT = process.env.PORT || "5080";
app.use(routes_1.router);
app.listen(PORT, function () {
    connection.connect();
    console.log("http://localhost:5080");
});

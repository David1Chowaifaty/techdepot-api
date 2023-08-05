import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import { router } from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const connection = mysql.createConnection(process.env.DATABASE_URL || "");

app.set("connection", connection);
const PORT = process.env.PORT || "5080";
app.use(router);
app.listen(PORT, () => {
  connection.connect();
  console.log("http://localhost:5080");
});

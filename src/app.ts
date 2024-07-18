import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { router } from "./routes";

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || "5080";
app.use(router);
app.listen(PORT, () => {
  console.log("http://localhost:5080");
});

import { Router } from "express";

export const router = Router();
router.get("/", (req, res) => {
  console.log("let's goooooo let's go celtics 🍀🍀🍀🍀🍀🍀");
  res.send("let's goooooo let's go celtics 🍀🍀🍀🍀🍀🍀");
});

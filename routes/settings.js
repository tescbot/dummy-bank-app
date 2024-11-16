import express from "express";

export const path = "/settings";
export const router = express.Router();

router.get("/", (req, res) => {
  res.render("settings", {title: "Settings" });
});

const express = require("express");

const {
  createQuestion,
  getQuestion,
  getQuestions,
} = require("../models/questionModel");
const tryCatchResError = require("../utils/tryCatchResError");

const router = express.Router();

router.post("/", async (req, res, next) => {
  await tryCatchResError(req, res, next, createQuestion);
});

router.get("/", async (req, res, next) => {
  await tryCatchResError(req, res, next, getQuestions);
});

router.get("/:id", async (req, res, next) => {
  await tryCatchResError(req, res, next, getQuestion);
});

module.exports = router;

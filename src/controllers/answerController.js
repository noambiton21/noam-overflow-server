const express = require("express");

const { updateAnswer, createAnswer } = require("../models/answerModel");

const tryCatchResError = require("../utils/tryCatchResError");

const router = express.Router();

router.post("/", async (req, res, next) => {
  await tryCatchResError(req, res, next, createAnswer);
});

router.put("/:id", async (req, res, next) => {
  await tryCatchResError(req, res, next, updateAnswer);
});

module.exports = router;

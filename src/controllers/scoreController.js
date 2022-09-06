const express = require("express");

const { addScore } = require("../models/scoreModel");
const tryCatchResError = require("../utils/tryCatchResError");

const router = express.Router();

router.post("/", async (req, res, next) => {
  await tryCatchResError(req, res, next, addScore);
});

module.exports = router;

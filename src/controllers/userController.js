const express = require("express");
const { getUser, login } = require("../models/userModel");
const tryCatchResError = require("../utils/tryCatchResError");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  await tryCatchResError(req, res, next, getUser);
});

router.post("/", async (req, res, next) => {
  await tryCatchResError(req, res, next, login);
});

module.exports = router;

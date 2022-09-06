const express = require("express");
const { login } = require("../models/authModel");
const tryCatchResError = require("../utils/tryCatchResError");

const router = express.Router();

router.post("/", async (req, res, next) => {
  tryCatchResError(req, res, next, login);
});

module.exports = router;

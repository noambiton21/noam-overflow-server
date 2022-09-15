const jwt = require("jsonwebtoken");
const { config } = require("../../config/index");

const httpStatuses = config.httpStatuses;

const UserModel = require("../../database/schemas/userSchema");

const verifyJwt = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    const decodedJwt = jwt.verify(token, process.env.jwt_secret);
    const user = await UserModel.findById(decodedJwt.id);
    if (!user) {
      res.status(httpStatuses.unauthorized);
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = verifyJwt;

const UserModel = require("../database/schemas/userSchema");
const { config } = require("../config/index");

const httpStatuses = config.httpStatuses;
const jwt = require("jsonwebtoken");
const { sha512 } = require("js-sha512");

const login = async (req, res) => {
  const { email, password } = req.body;

  const encryptedPassword = sha512(password);
  const user = await UserModel.findOne({
    email,
    password: encryptedPassword,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      "noam-secret"
    );
    return res.status(httpStatuses.ok).send({ data: token });
  } else {
    return res.status(httpStatuses.notFound).json("User not found");
  }
};

module.exports = {
  login,
};

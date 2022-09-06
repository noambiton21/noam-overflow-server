const UserModel = require("../database/schemas/userSchema");
const { config } = require("../config/index");

const httpStatuses = config.httpStatuses;

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (user) {
    res.status(httpStatuses.ok).json(user);
  } else {
    res.status(httpStatuses.notFound).json(`user with id ${id} not exists`);
  }
  return user;
};

module.exports = {
  getUser,
};

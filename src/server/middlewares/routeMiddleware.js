const answerController = require("../../controllers/answerController");
const questionController = require("../../controllers/questionController");
const userController = require("../../controllers/userController");
const scoreController = require("../../controllers/scoreController");

const applyRouteMiddleware = (app) => {
  app.use("/api/answer", answerController);
  app.use("/api/question", questionController);
  app.use("/api/user", userController);
  app.use("/api/score", scoreController);
};

module.exports = {
  applyRouteMiddleware,
};

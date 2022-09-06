const { config } = require("../config/index");
const AnswerModel = require("../database/schemas/answerSchema");
const ScoreModel = require("../database/schemas/scoreSchema");

const httpStatuses = config.httpStatuses;

const addScore = async (req, res) => {
  const body = req.body;

  const { createdBy, answerId, newScore } = body;

  const scoreExists = await ScoreModel.findOne({
    createdBy,
    answerId,
  });

  if (scoreExists) {
    res.status(httpStatuses.notFound).json(`Already voted for score`);
  } else {
    const score = await ScoreModel.create({
      answerId,
      createdBy,
    });

    if (score) {
      res.status(httpStatuses.created).json(score);
    } else {
      res.status(httpStatuses.internalServerError).json("Server Error");
    }
    const answer = await AnswerModel.findOne({ _id: answerId });

    answer.score = newScore;

    const updateDocument = await AnswerModel.findOneAndUpdate(
      { _id: answerId },
      answer,
      {
        new: true,
      }
    );
  }
};

module.exports = {
  addScore,
};

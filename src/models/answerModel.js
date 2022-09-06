const AnswerModel = require("../database/schemas/answerSchema");
const { config } = require("../config/index");

const { addAnswerToQuestion } = require("./questionModel");

const httpStatuses = config.httpStatuses;

const createAnswer = async (req, res) => {
  const { content, questionId } = req.body;
  const answer = await AnswerModel.create({
    content,
    createdBy: req.user.id,
  });
  if (answer) {
    const updatedQuestion = await addAnswerToQuestion(questionId, answer._id);
    res.status(httpStatuses.created).json(answer);
    return answer;
  } else {
    res.status(httpStatuses.internalServerError).json(`Server Error.`);
  }
};

const updateAnswer = async (req, res) => {
  const { score } = req.body;
  const id = req.params.id;

  if (!score) {
    res.status(400).send("score is required");
  }

  const answer = await AnswerModel.findByIdAndUpdate(
    id,
    { score },
    { new: true }
  );
  if (!answer) {
    res.status(httpStatuses.internalServerError).json(`Server Error.`);
  } else {
    res.status(httpStatuses.ok).json(answer);
  }
};

module.exports = {
  createAnswer,
  updateAnswer,
};

const QuestionModel = require("../database/schemas/questionSchema");
const { config } = require("../config/index");

const httpStatuses = config.httpStatuses;

const createQuestion = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    res.status(httpStatuses.badREquest).json("Title and content are required");
  }

  const question = await QuestionModel.create({
    title,
    content,
    tags,
    createdBy: req.user.id,
    createdByEmail: req.user.email,
  });

  if (question) {
    res.status(httpStatuses.created).json(question);
  } else {
    res.status(httpStatuses.internalServerError).json("Server Error");
  }
};

const addAnswerToQuestion = async (questionId, answerId) => {
  const question = await QuestionModel.findById(questionId);

  const result = await QuestionModel.findByIdAndUpdate(question.id, {
    answers: [...question.answers, answerId],
  });

  return result;
};

const getQuestion = async (req, res) => {
  const id = req.params.id;
  const question = await QuestionModel.findOne({ _id: id })
    .populate("answers")
    .populate("createdBy")
    .populate({
      path: "answers",
      model: "Answer",
      populate: {
        path: "createdBy",
        model: "User",
      },
    });
  if (question) {
    res.status(httpStatuses.ok).json(question);
  } else {
    res.status(httpStatuses.notFound).json(`Question with id ${id} not exists`);
  }
  return question;
};

const getQuestions = async (req, res) => {
  const filter = req.query.filter || "";

  const questions = await QuestionModel.find({}).populate("answers");

  if (questions) {
    const filteredQuestions = questions.filter((question) =>
      question.title.toLowerCase().includes(filter.toString().toLowerCase())
    );
    res.send(filteredQuestions);
  } else {
    res.status(httpStatuses.notFound).json(`Questions not found`);
  }
};

module.exports = {
  createQuestion,
  getQuestion,
  addAnswerToQuestion,
  getQuestions,
};

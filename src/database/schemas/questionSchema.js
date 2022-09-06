const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer", default: [] }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    protocol: {
      type: String,
      enum: ["http", "https"],
      default: "http",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Question", QuestionSchema);

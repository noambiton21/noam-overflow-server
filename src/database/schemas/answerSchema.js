const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Answer", AnswerSchema);

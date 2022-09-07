const { Schema, model } = require("mongoose");

const ScoreSchema = new Schema(
  {
    answerId: { type: Schema.Types.ObjectId },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Score", ScoreSchema);

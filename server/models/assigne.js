const mongoose = require("mongoose");

const assignSchema = new mongoose.Schema(
  {
    people: {
      type: String,
      require: true,
    },
  },
  { timestamps: { createdAt: "", updatedAt: "" } }
);

const assign = new mongoose.model("todo", assignSchema);

module.exports = assign;

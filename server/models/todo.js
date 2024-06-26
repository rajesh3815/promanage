const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      require: true,
    },
    priority: {
      type: String,
      require: true,
    },
    assignto: {
      type: String,
    },
    createdDt: {
      type: String,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  { timestamps: { createdAt: "", updatedAt: "" } }
);

const todo = new mongoose.model("todo", todoSchema);

module.exports = todo;

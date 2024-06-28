const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
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
    todoStatus: {
      type: String,
      default: "todo",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: { createdAt: "", updatedAt: "" } }
);

const todo = new mongoose.model("todo", todoSchema);

module.exports = todo;

const assign = require("../models/todo");

const addTodo = async (req, res) => {
  const { taskName, priority, assignto, createdDt, tasks } = req.body;
  if (!taskName || !priority || !assignto || !createdDt || !tasks) {
    return res.status(400).send({
      message: "All fields are requred",
      status: 0,
    });
  }
  try {
    const newTodo = new user({
      taskName,
      priority,
      assignto,
      createdDt,
      tasks,
    });
    await newTodo.save();
    res.send({
      message: "assign people created Successfully",
      status: 1,
    });
  } catch (error) {}
};
module.exports = { addTodo };

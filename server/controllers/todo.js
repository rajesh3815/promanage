const todo = require("../models/todo");

const addTodo = async (req, res) => {
  const { taskName, priority, assignto, createdDt, tasks } = req.body;
  console.log(req.body);
  if (!taskName || !priority || !assignto || !createdDt || !tasks) {
    return res.status(400).send({
      message: "All fields are requred",
      status: 0,
    });
  }
  try {
    const newTodo = new todo({
      taskName,
      priority,
      assignto,
      createdDt,
      tasks,
    });
    await newTodo.save();
    res.send({
      message: "task created Successfully",
      status: 1,
    });
  } catch (error) {
    res.status(400).res.send({
      message: "Errors",
      status: 0,
    });
    console.log("error from getting assign people:)", error);
  }
};
module.exports = { addTodo };

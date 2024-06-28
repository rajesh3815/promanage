const todo = require("../models/todo");

const addTodo = async (req, res) => {
  const { taskName, priority, assignto, createdDt, tasks } = req.body;
  const userId = req.userId;
  console.log(req.body);
  if (!taskName || !priority || !tasks) {
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
      userId,
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
    console.log("error from set todos:)", error);
  }
};

const getAlltodo = async (req, res) => {
  const userId = req.userId;
  const tasks = await todo.find({ userId });
  try {
    res.send({
      tasks,
      message: " Success",
      status: 1,
    });
  } catch (error) {
    res.status(400).res.send({
      message: "Errors",
      status: 0,
    });
    console.log("error from get all todos:)", error);
  }
};

const getAnalytics = async (req, res) => {
  const userId = req.userId;
  const analytics = {
    backlog: 0,
    highPriority: 0,
    lowPriority: 0,
    moderatePriority: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    deuDat: 0,
  };

  try {
    const tasks = await todo.find({ userId });

    tasks.forEach((task) => {
      // Counting priorities
      if (task.priority === "HIGH PRIORITY") {
        analytics.highPriority += 1;
      } else if (task.priority === "LOW PRIORITY") {
        analytics.lowPriority += 1;
      } else if (task.priority === "MODERATE PRIORITY") {
        analytics.moderatePriority += 1;
      }

      // Counting statuses
      if (task.todoStatus === "todo") {
        analytics.todo += 1;
      } else if (task.todoStatus === "inProgress") {
        analytics.inProgress += 1;
      } else if (task.todoStatus === "done") {
        analytics.done += 1;
      } else if (task.todoStatus === "backlog") {
        analytics.backlog += 1;
      }
      if (task.createdDt) {
        analytics.deuDat += 1;
      }
    });

    // Send the analytics object as a response
    res.json({
      status: 1,
      message: "Success",
      analytics,
    });
  } catch (error) {
    console.error("Error getting analytics:", error);
    res.status(500).json({
      status: 0,
      message: "Error getting analytics",
      error: error.message,
    });
  }
};
const getTaskById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 1,
      message: "No id",
    });
  }
  try {
    const task = await todo.findOne({ _id: id });
    res.json({
      status: 1,
      message: "Success",
      task,
    });
  } catch (error) {
    console.error("Error getting task by id:", error);
    res.status(500).json({
      status: 0,
      message: "Error getting task by id",
      error: error.message,
    });
  }
};
const getFilterData = async (req, res) => {
  const { filterType } = req.body;
  const userId = req.userId;
  if (!filterType) {
    return res.status(400).json({
      status: 0,
      message: "no filter",
    });
  }
  try {
    let filter = { userId };

    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000;

    const startOfDayIST = new Date(now);
    startOfDayIST.setUTCHours(0, 0, 0, 0);
    startOfDayIST.setTime(startOfDayIST.getTime() + offset);

    const endOfDayIST = new Date(startOfDayIST);
    endOfDayIST.setDate(startOfDayIST.getDate() + 1);

    const startOfWeekIST = new Date(startOfDayIST);
    startOfWeekIST.setDate(
      startOfWeekIST.getDate() - startOfWeekIST.getUTCDay()
    );

    const endOfWeekIST = new Date(startOfWeekIST);
    endOfWeekIST.setDate(startOfWeekIST.getDate() + 7);

    const startOfMonthIST = new Date(now);
    startOfMonthIST.setUTCDate(1);
    startOfMonthIST.setUTCHours(0, 0, 0, 0);
    startOfMonthIST.setTime(startOfMonthIST.getTime() + offset);

    const endOfMonthIST = new Date(startOfMonthIST);
    endOfMonthIST.setUTCMonth(startOfMonthIST.getUTCMonth() + 1);

    switch (filterType) {
      case "today":
        filter.createdAt = { $gte: startOfDayIST, $lt: endOfDayIST };
        break;
      case "this week":
        filter.createdAt = { $gte: startOfWeekIST, $lt: endOfWeekIST };
        break;
      case "this month":
        filter.createdAt = { $gte: startOfMonthIST, $lt: endOfMonthIST };
        break;
      default:
        break;
    }
    console.log(filter);
    const tasks = await todo.find(filter);
    res.status(200).json({ status: 1, message: "Success", tasks });
  } catch (error) {
    console.error("Error in getFilterData:", error);
    res.status(500).json({
      status: 0,
      message: "Error in getFilterData",
      error: error.message,
    });
  }
};

const editTask = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 1,
      message: "No id",
    });
  }
  if (!status) {
    return res.status(400).send({
      message: "status field is required",
      status: 0,
    });
  }
  try {
    const taskUpdate = await todo.findOne({ _id: id });
    taskUpdate.todoStatus = status;
    await taskUpdate.save();
    res.json({
      status: 1,
      message: " edit Success",
    });
  } catch (error) {
    console.error("Error in edit task:", error);
    res.status(500).json({
      status: 0,
      message: "Error in edit task id",
      error: error.message,
    });
  }
};

module.exports = {
  addTodo,
  getAlltodo,
  getAnalytics,
  getTaskById,
  getFilterData,
  editTask,
};

const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { addTodo } = require("../controllers/todo");
const todoRouter = express.Router();

todoRouter.post("/addtodo",verifyToken,addTodo);

module.exports = todoRouter;

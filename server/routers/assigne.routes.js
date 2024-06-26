const express = require("express");
const { addPeople, getAllpeople } = require("../controllers/assigne");
const assigneRouter = express.Router();

assigneRouter.post("/assign", addPeople);
assigneRouter.get("/getPeople", getAllpeople);

module.exports = assigneRouter;

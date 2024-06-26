const assign = require("../models/assigne");

const addPeople = async (req, res) => {
  const { people } = req.body;
  if (!people) {
    return res.status(400).send({
      message: "All fields are requred",
      status: 0,
    });
  }
  try {
    const isExist = await assign.findOne({ people });
    if (isExist) {
      return res.send({
        message: "assign people Already exist",
        status: 2,
      });
    }
    const newAssign = new assign({
      people,
    });
    await newAssign.save();
    res.send({
      message: "assign people created Successfully",
      status: 1,
    });
  } catch (error) {
    res.status(400).res.send({
      message: "Errors",
      status: 0,
    });
    console.log("error from assign people:)", error);
  }
};

const getAllpeople = async (req, res) => {
  try {
    const peoples = await assign.find({});
    res.send({
      message: "success",
      peoples,
    });
  } catch (error) {
    res.status(400).res.send({
      message: "Errors",
      status: 0,
    });
    console.log("error from getting assign people:)", error);
  }
};
module.exports = { addPeople, getAllpeople };

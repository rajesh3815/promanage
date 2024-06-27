import React, { useEffect, useState } from "react";
import Style from "./Task.module.css";
import { getTaskbyid } from "../../api/task";
import { useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();

  const [task, setTask] = useState({});
  useEffect(() => {
    getTask();
  }, []);
  const getTask = async () => {
    const taskData = await getTaskbyid(id);
    setTask(taskData.task);
  };

  return <div>Task</div>;
};

export default Task;

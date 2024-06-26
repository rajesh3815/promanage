import axios from "axios";
const staticUrl = "http://localhost:3000";

export const addPeople = async (people) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${staticUrl}/api/v1/people/assign`, {
      people,
    });
    console.log(res);
    return res.data.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllPeople = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/people/getPeople`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createTodo = async (
  title,
  selectedOption,
  dueDate,
  assignPeople,
  tasks
) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${staticUrl}/api/v1/todo/addtodo`, {
      taskName: title,
      priority: selectedOption,
      assignto: assignPeople,
      createdDt: dueDate,
      tasks,
    });
    console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

import React, { useEffect, useRef, useState } from "react";
import { useId } from "react";
import Style from "./Addtodo.module.css";
const options = ["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"];
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { createTodo, getAllPeople } from "../../api/task";

const Addtodo = ({ setAddtodoform }) => {
  const [selectedOption, setSelectedOption] = useState(""); //for storing priority
  const [title, setTitle] = useState(""); //for storing title
  const [assign, setAssign] = useState([]);
  const [assignPeople, setAssignPeople] = useState("");
  const [tasks, setTasks] = useState([
    { checked: false, id: 1719414986792, text: "" },
  ]); //for tasks
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    getPeopledata();
  }, []);
  //getting all assigne peoples
  const getPeopledata = async () => {
    const data = await getAllPeople();
    setAssign(data?.peoples);
  };

  //setup for task handle---------------------------
  const handleCheck = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddNew = () => {
    const newTask = { id: Date.now(), text: "", checked: false };
    setTasks([...tasks, newTask]);
  };

  const handleTextChange = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };
  const checkedCount = tasks.filter((task) => task.checked).length;
  //+-----------------------------------------------------------//

  // setting up date----
  const [dueDate, setDueDate] = useState("");
  const dateInputRef = useRef(null);
  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };
  const handleButtonClick = () => {
    dateInputRef.current.showPicker();
  };
  //--------------------
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }; //handeling for priority check

  //form submit handel
  const clickHandeler = () => {
    if (!title) {
      setErr("Title field is required");
      return;
    } else if (!dueDate) {
      setErr("Date field is required");
      return;
    } else if (!selectedOption) {
      setErr("Priority field is required");
      return;
    } else {
      setErr("");
    }
    let flg = false;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].text.trim() === "") {
        flg = true;
        setErr("All fields is required");
      }
    }
    if (flg) return;
    setErr("");
    const data = createTodo(
      title,
      selectedOption,
      dueDate,
      assignPeople,
      tasks
    );
    console.log("success");
  };

  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        <p>
          Title <span style={{ color: "red", fontSize: "20px" }}>*</span>
        </p>
        <input
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          className={Style.innerDivinp}
          type="text"
          placeholder="Enter Task Title"
        />
        <div className={Style.chips}>
          <p>
            select Priority{" "}
            <span style={{ color: "red", fontSize: "20px" }}>*</span>
          </p>
          <div className={Style.priorityChip}>
            {options.map((option) => (
              <span
                key={option}
                onClick={() => handleOptionClick(option)}
                style={{
                  backgroundColor:
                    option === selectedOption ? "rgb(213 210 210)" : "",
                }}
              >
                <div
                  className={`${Style.circle} ${
                    option === "HIGH PRIORITY"
                      ? Style.red
                      : option === "MODERATE PRIORITY"
                      ? Style.sky
                      : Style.green
                  } `}
                ></div>
                {option}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className={Style.dropdownButton}>
            <p>Assign to</p>
            <div className={Style.assign}>
              {assignPeople ? assignPeople : "Add a assignee"}{" "}
              <span onClick={() => setIsOpen(!isOpen)} className={Style.arrow}>
                {isOpen ? (
                  <RiArrowDropUpLine style={{ fontSize: "2rem" }} />
                ) : (
                  <RiArrowDropDownLine style={{ fontSize: "2rem" }} />
                )}
              </span>
            </div>
          </div>
          <div className={Style.dropDiv}>
            {isOpen && (
              <ul className={Style.dropdownMenu}>
                {assign?.map((assign) => (
                  <li key={assign._id}>
                    <span>{assign.people?.slice(0, 2)}</span>
                    {assign.people}
                    <button onClick={() => setAssignPeople(assign.people)}>
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* task div */}
        <div className={Style.checks}>
          <h3>
            Checklist ({checkedCount}/{tasks.length}){" "}
            <span className={Style.required}>*</span>
          </h3>
          <div className={Style.tasks}>
            {tasks.map((task) => (
              <div key={task.id} className={Style.task}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleCheck(task.id)}
                />
                <input
                  type="text"
                  className={`${Style.taskText}`}
                  value={task.text}
                  onChange={(e) => handleTextChange(task.id, e.target.value)}
                  placeholder="Enter task"
                />
                <button
                  className={Style.deleteButton}
                  onClick={() => handleDelete(task.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
            <button className={Style.addButton} onClick={handleAddNew}>
              + Add New
            </button>
          </div>
        </div>

        <div className={Style.btnDiv}>
          {/* date valu */}
          <div className={Style.dueDatePicker}>
            <button
              style={{
                color: "rgba(112, 112, 112, 1)",
                fontWeight: "200",
                border: "1px solid rgba(226, 226, 226, 1)",
              }}
              className={Style.dueDateButton}
              onClick={handleButtonClick}
            >
              {dueDate ? dueDate : "Select Due Date"}
            </button>
            <input
              type="date"
              className={Style.dueDateInput}
              ref={dateInputRef}
              value={dueDate}
              onChange={handleDateChange}
            />
          </div>

          <div className={Style.btnDivright}>
            <button
              onClick={() => setAddtodoform(false)}
              style={{
                color: "rgba(207, 54, 54, 1)",
                border: "1px solid rgba(207, 54, 54, 1)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={clickHandeler}
              style={{
                color: "white",
                background: "rgba(23, 162, 184, 1)",
                marginBottom: "1rem",
              }}
            >
              Save
            </button>
          </div>
        </div>
        <p className={Style.errMessage}>{err}</p>
      </div>
    </div>
  );
};

export default Addtodo;

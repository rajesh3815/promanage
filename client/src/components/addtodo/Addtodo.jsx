import React, { useRef, useState } from "react";
import Style from "./Addtodo.module.css";
const options = ["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"];
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

const Addtodo = () => {
  const [selectedOption, setSelectedOption] = useState(); //for storing priority
  const [title, setTitle] = useState(""); //for storing title
  const [assign, setAssign] = useState(["a", "d"]);
  const [assignPeople, setAssignPeople] = useState("");
  const [tasks, setTasks] = useState([]); //for tasks

  const [isOpen, setIsOpen] = useState(false);

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
  };//handeling for priority check
  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        <p>
          Title <span style={{ color: "red", fontSize: "20px" }}>*</span>
        </p>
        <input
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
              <span key={option} onClick={() => handleOptionClick(option)}>
                <div
                  className={`${Style.circle} ${
                    option === "HIGH PRIORITY"
                      ? Style.red
                      : option === "MODERATE PRIORITY"
                      ? Style.sky
                      : Style.green
                  }`}
                ></div>
                {option}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className={Style.dropdownButton}>
            <p>Assign to</p>
            {assign}{" "}
            <span onClick={() => setIsOpen(!isOpen)} className={Style.arrow}>
              {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </span>
          </div>
          {isOpen && (
            <ul className={Style.dropdownMenu}>
              {assign.map((option) => (
                <li key={option} onClick={() => {}}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={Style.tasks}>
          <p>
            Checklist (1/3) <span style={{ color: "red" }}>*</span>
          </p>
          <div className={Style.taskdiv}>
            <input type="text" />
          </div>
          <span className={Style.addBtn}>+ Add New</span>
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
              style={{
                color: "rgba(207, 54, 54, 1)",
                border: "1px solid rgba(207, 54, 54, 1)",
              }}
            >
              Cancel
            </button>
            <button
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
      </div>
    </div>
  );
};

export default Addtodo;

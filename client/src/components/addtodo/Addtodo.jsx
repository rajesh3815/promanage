import React, { useState } from "react";
import Style from "./Addtodo.module.css";
const options = ["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"];
const Addtodo = () => {
  const [selectedOption, setSelectedOption] = useState("This week");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        <p>
          Title <span style={{ color: "red", fontSize: "20px" }}>*</span>
        </p>
        <input type="text" placeholder="Enter Task Title" />
        <div className={Style.chips}>
          <p>
            Select Priority{" "}
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
      </div>
    </div>
  );
};

export default Addtodo;

import React, { useState } from "react";
import Style from "./Board.module.css";
import people from "../../assets/people.svg";
const options = ["Today", "This week", "This month"];
const Board = () => {
  const [selectedOption, setSelectedOption] = useState("This week");
  const [isOpen, setIsOpen] = useState(false);
  const formatDate = () => {
    const newDate = new Date();

    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "short" });
    const year = newDate.getFullYear();

    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    const dayWithSuffix = getDayWithSuffix(day);

    return `${dayWithSuffix} ${month}, ${year}`;
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className={Style.mainContainer}>
      <div className={Style.header}>
        <div className={Style.heroLeft}>
          <p>Welcome Kumar!</p>
          <div className={Style.addPpl}>
            <p>Board</p>{" "}
            <span>
              <img src={people} alt="" />
              Add People
            </span>
          </div>
        </div>
        <div className={Style.heroRight}>
          <p>{formatDate()}</p>
          <div className={Style.dropdown}>
            <div className={Style.dropdownButton}>
              {selectedOption}{" "}
              <span onClick={() => setIsOpen(!isOpen)} className={Style.arrow}>
                {isOpen ? "▲" : "▼"}
              </span>
            </div>
            {isOpen && (
              <ul className={Style.dropdownMenu}>
                {options.map((option) => (
                  <li key={option} onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

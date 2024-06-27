import React, { useState } from "react";
import Style from "./Card.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
const Card = ({ task }) => {
  const [dotOpen, setDotOpen] = useState(false);
  return (
    <div className={Style.container}>
      <div className={Style.head}>
        <span className={Style.leftSpan}>
          {task?.priority}
          <span>{task?.assignto.slice(0, 2)}</span>
        </span>
        <span onClick={() => setDotOpen(!dotOpen)}>
          <HiOutlineDotsHorizontal />
        </span>
        {dotOpen ? (
          <div className={Style.popup}>
            <ul>
              <li>Edit</li>
              <li>Share</li>
              <li>Delete</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <p></p>
    </div>
  );
};

export default Card;

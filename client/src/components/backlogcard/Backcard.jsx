import React, { useContext, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import up from "../../assets/aup.svg";
import down from "../../assets/adw.svg";
import Style from "./Backcard.module.css";
import { taskContext } from "../../TaskContext";
import { editTask } from "../../api/task";
const Backcard = ({ task, collapseAll }) => {
  const { taskgets, setTaskgets } = useContext(taskContext);
  const [dotOpen, setDotOpen] = useState(false);
  const [arrowOpen, setArrowOpen] = useState(false);
  useEffect(() => {
    setArrowOpen(false);
  }, [collapseAll]);

  //formating date
  function formatDate(dateString) {
    if (!dateString) return;
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    let suffix;

    if (day >= 11 && day <= 13) {
      suffix = "th";
    } else {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
      }
    }

    return formattedDate.replace(/\d+/, day + suffix);
  }
  //---------------
  function dateColor(dateString) {
    const dewDate = new Date(dateString).getDate();
    const curDt = new Date().getDate();
    if (!dewDate) return false;
    return dewDate < curDt;
  }
  const clickHandeler = async (status, id) => {
    const data = await editTask(status, id);

    setTaskgets(!taskgets);
  };
  return (
    <div className={Style.container}>
      <div className={Style.head}>
        <div className={Style.leftSpan}>
          <div className={Style.prioritys}>
            <div
              className={`${Style.circle} ${
                task?.priority === "HIGH PRIORITY"
                  ? Style.red
                  : task?.priority === "MODERATE PRIORITY"
                  ? Style.sky
                  : Style.green
              } ${Style.prioritySpan}`}
            ></div>
            <span>{task?.priority}</span>
          </div>
          {task?.assignto && (
            <span className={Style.assignSpan}>
              {task?.assignto.slice(0, 2)}
            </span>
          )}
        </div>

        <span onClick={() => setDotOpen(!dotOpen)}>
          <HiOutlineDotsHorizontal />
        </span>
        {dotOpen ? (
          <div className={Style.popup}>
            <ul>
              <li>Edit</li>
              <li>Share</li>
              <li style={{ color: "red" }}>Delete</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <p title={task.taskName} className={Style.taskTitle}>
        {task.taskName.slice(0, 30)}
        {task.taskName.length > 30 ? "..." : ""}
      </p>
      <div className={Style.checkList}>
        <div className={Style.checkListHero}>
          <p>Checklist (0/3)</p>
          <span onClick={() => setArrowOpen(!arrowOpen)}>
            {arrowOpen ? <img src={up}></img> : <img src={down}></img>}
          </span>
        </div>
        {arrowOpen
          ? task?.tasks?.map((todo, index) => {
              return (
                <div key={todo.id} className={Style.task}>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    // onChange={() => handleCheck(task.id)}
                  />
                  <p>{todo.text}</p>
                </div>
              );
            })
          : ""}
        <div className={Style.bthDiv}>
          {task?.createdDt ? (
            <span
              style={{
                background: dateColor(task?.createdDt)
                  ? "rgba(207, 54, 54, 1)"
                  : "rgba(238, 236, 236, 1)",
                color: dateColor(task?.createdDt)
                  ? "white"
                  : "rgba(118, 117, 117, 1)",
              }}
            >
              {formatDate(task?.createdDt)}
            </span>
          ) : (
            <div></div>
          )}

          <div className={Style.btns}>
            <button onClick={() => clickHandeler("progress", task._id)}>
              PROGRESS
            </button>
            <button onClick={() => clickHandeler("todo", task._id)}>
              TO-DO
            </button>
            <button onClick={() => clickHandeler("done", task._id)}>
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Backcard;

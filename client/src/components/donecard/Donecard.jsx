import React, { useContext, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import up from "../../assets/aup.svg";
import down from "../../assets/adw.svg";
import Style from "./Donecard.module.css";
import { editTask } from "../../api/task";
import { taskContext } from "../../TaskContext";
const Donecard = ({ task, collapseAll }) => {
  const {
    taskgets,
    setTaskgets,
    setDeletmodalOpen,
    setDeletId,
    setTododModal,
    setEditdata,
  } = useContext(taskContext);
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
  const clickHandeler = async (status, id) => {
    const data = await editTask(status, id);

    setTaskgets(!taskgets);
  };

  //handle delete
  const deletHandeler = (id) => {
    setDeletId(id);
    setDeletmodalOpen(true);
    setDotOpen(false);
  };

  const shareHandeler = async (id) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}/task/${id}`;
    try {
      await navigator.clipboard.writeText(baseUrl);
      console.log(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const editHandeler = (task) => {
    setEditdata(task);
    setTododModal(true);
    setDotOpen(false);
  };
  const checkedCount = task?.tasks?.filter((tasks) => tasks?.checked)?.length;
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
              <li onClick={() => editHandeler(task)}>Edit</li>
              <li onClick={() => shareHandeler(task._id)}>Share</li>
              <li
                onClick={() => deletHandeler(task._id)}
                style={{ color: "red" }}
              >
                Delete
              </li>
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
          <p>
            Checklist ({checkedCount}/{task?.tasks?.length})
          </p>
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
            <span>{formatDate(task?.createdDt)}</span>
          ) : (
            <div></div>
          )}

          <div className={Style.btns}>
            <button onClick={() => clickHandeler("backlog", task._id)}>
              BACKLOG
            </button>
            <button onClick={() => clickHandeler("todo", task._id)}>
              TO-DO
            </button>
            <button onClick={() => clickHandeler("progress", task._id)}>
              PROGRESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donecard;

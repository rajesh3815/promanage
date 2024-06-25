import React from "react";
import Style from "./Addmodal.module.css";
const Addmodal = ({setAddpplmodal}) => {
  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        <p>Add people to the board</p>
        <input type="text" placeholder="Enter the email" />
        <div className={Style.btnDiv}>
          <button onClick={()=>setAddpplmodal(false)}
            style={{
              color: "rgba(207, 54, 54, 1)",
              border: "1px solid rgba(207, 54, 54, 1)",
            }}
          >
            cancel
          </button>
          <button style={{
              color: "white",
              background:"rgba(23, 162, 184, 1)"
            }}>Add email</button>
        </div>
      </div>
    </div>
  );
};

export default Addmodal;

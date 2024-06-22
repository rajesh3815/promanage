import React, { useState } from "react";
import Style from "./Register.module.css";
import imgRegister from "../../assets/Art.svg";
const Register = () => {
  const [err, setErr] = useState("");
  const [formData, setFormdata] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [errordata, setErrordata] = useState({
    name: "",
    password: "",
    email: "",
  });
  return (
    <div className={Style.mainDiv}>
      <div className={Style.leftDiv}>
        <div className={Style.imgDiv}>
          <span className={Style.circle}></span>
          <img src={imgRegister} alt="" />
        </div>
      </div>
      <div className={Style.rightDiv}>
        <form>
          <input type="text" placeholder="name" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="confirm password" />
          <input type="text" placeholder="password" />
        </form>
      </div>
    </div>
  );
};

export default Register;

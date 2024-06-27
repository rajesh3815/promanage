import React, { useState } from "react";
import Style from "./Setting.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
const Setting = () => {
  const [togglPassword, setTogglPassword] = useState(false);
  const [togglPasswordc, setTogglPasswordc] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    password: "",
    oldpassword: "",
    email: "",
  });
  const [errordata, setErrordata] = useState({
    name: "",
    password: "",
    email: "",
    oldpassword: "",
  });

  const changeHandeler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const registerHandeler = async (e) => {
    e.preventDefault();
    const l = e.target.length;
    let flg = false;
    for (let i = 0; i < l - 1; i++) {
      const { name } = e.target[i];

      if (e.target[i].value.trim() === "") {
        console.log(e.target[i]);
        flg = true;
        setErrordata((prev) => {
          return { ...prev, [name]: `${name} field is require` };
        });
      } else {
        setErrordata((prev) => {
          return { ...prev, [name]: "" };
        });
      }
    }
    if (flg) return;
    setErrordata({ name: "", password: "", email: "" });
    if (formData.password === formData.oldpassword) {
      console.log(formData.password,formData.oldpassword);
      setErrordata((prev) => {
        return { ...prev, password: "password cant be same" };
      });
      return;
    } else {
      setErrordata((prev) => {
        return { ...prev, oldpassword: "" };
      });
    }
    console.log(formData);
  };

  return (
    <div className={Style.container}>
      <p className={Style.head}>Settings</p>
      <form onSubmit={registerHandeler}>
        <div className={Style.inputDiv}>
          <span style={{ marginTop: "4px" }}>
            <IoPersonOutline
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={changeHandeler}
          />
        </div>
        <p style={{ color: "red", marginBottom: "10px" }}>{errordata.name}</p>
        <div className={Style.inputDiv}>
          <span style={{ marginTop: "3px" }}>
            <CiMail
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type="text"
            placeholder="Updated Email"
            name="email"
            value={formData.email}
            onChange={changeHandeler}
          />
        </div>
        <p style={{ color: "red", marginBottom: "10px" }}>{errordata.email}</p>
        <div className={Style.inputDiv}>
          <span>
            <CiLock
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type={togglPasswordc ? "text" : "password"}
            placeholder="Old Password"
            name="oldpassword"
            value={formData.oldpassword}
            onChange={changeHandeler}
          />
          <span style={{ marginTop: "4px" }}>
            {togglPasswordc ? (
              <IoEyeOffOutline
                onClick={() => setTogglPasswordc(false)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            ) : (
              <IoEyeOutline
                onClick={() => setTogglPasswordc(true)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            )}
          </span>
        </div>
        <p style={{ color: "red", marginBottom: "10px" }}>
          {errordata.oldpassword}
        </p>

        <div className={Style.inputDiv}>
          <span>
            <CiLock
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type={togglPassword ? "text" : "password"}
            placeholder="New Password"
            name="password"
            value={formData.password}
            onChange={changeHandeler}
          />
          <span style={{ marginTop: "4px" }}>
            {togglPassword ? (
              <IoEyeOffOutline
                onClick={() => setTogglPassword(false)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            ) : (
              <IoEyeOutline
                onClick={() => setTogglPassword(true)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            )}
          </span>
        </div>
        <p style={{ color: "red", marginBottom: "10px" }}>
          {errordata.password}
        </p>
        <div className={Style.formFooter}>
          <button className={Style.btn}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default Setting;

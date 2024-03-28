import React, { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    console.log("HELLLOvg");
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      console.log("Hello" + passwordRef.current.value);
      const res = await axios.post("http://localhost:7000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  // console.log();

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form action="" className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Enter your Username.."
          className="loginInput"
          ref={userRef}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter Your password..."
          className="loginInput"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          <Link to="/Login" className="link">
            Login
          </Link>
        </button>
      </form>
      <button className="registerButton">
        {" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}

import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:7000/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      // console.log(res);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Register</span>
      <form action="" className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="">UserName</label>
        <input
          type="text"
          placeholder="Enter your UserName.."
          className="loginInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="Enter your Email.."
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter Your password..."
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">
          <Link to="/register" className="link" type="submit">
            Register
          </Link>
        </button>
      </form>
      <button className="registerButton">
        {" "}
        <Link to="/Login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong
        </span>
      )}
    </div>
  );
}

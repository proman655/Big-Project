import { useState } from "react";
import Logo from "../pictures/logo-title-nobg.png";
import LoginButton from "../pictures/login-button.png";
import RegisterButton from "../pictures/register-button.png";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          Email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      if (data) {
        window.location.href = "http://localhost:3000/home";
      }
    } catch (error) {
      document.getElementById("login-status").innerHTML = "Email/password incorrect";
      console.log("ERROR");
    }
  };
  return (
    <div className="div-login">
      <div className="div-login-logo">
        <img src={Logo} alt="logo" className="logo-img" />
      </div>
      <div className="div-login-form">
        <form onSubmit={submitHandler}>
          <div className="login-form-group">
            <input
              type="email"
              name="email"
              value={Email}
              placeholder="Email"
              className="login-input"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="login-form-group">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="login-input"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button onSubmit={submitHandler}>
            <img src={LoginButton} alt="login" className="login-button" />
          </button>
          
          <p id='login-status'></p>
          
          <div className="new-user-div">
            <p>New User?</p>
          </div>
          <Link to="/register">
            <button>
              <img
                src={RegisterButton}
                alt="register"
                className="register-button"
              />
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;

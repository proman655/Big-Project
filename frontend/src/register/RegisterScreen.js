import React, { useState } from "react";
import Logo from "../pictures/logo-register.png";
import RegisterButton from "../pictures/register-button.png";
import CancelButton from "../pictures/cancel-button.png";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

const RegisterScreen = () => {
  const [Email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phoneNumber, setPhone] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      console.log("Passwords do not match");
      document.getElementById("register-status").innerHTML = "Passwords do not match";
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "http://localhost:5000/api/user/register",
          {
            firstName,
            lastName,
            Email,
            password,
            phoneNumber,
          },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        if (data) {
          window.location.href = "http://localhost:3000/";
        }
      } catch (error) {
        console.log("ERROR");
      }
    }
    console.log(Email);
  };

  return (
    <div className="div-register">
      <div className="div-register-logo">
        <img src={Logo} alt="logo" className="logo-img" />
      </div>
      <div className="div-register-form">
        <form onSubmit={submitHandler}>
          <div className="register-form-group">
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="First name"
              className="register-input"
              required
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="register-form-group">
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last name"
              className="register-input"
              required
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="register-form-group">
            <input
              type="email"
              name="email"
              value={Email}
              placeholder="Email"
              className="register-input"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="register-form-group">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="register-input"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="register-form-group">
            <input
              type="password"
              name="passwordRepeat"
              value={passwordRepeat}
              placeholder="Re-type Password"
              className="register-input"
              required
              onChange={(e) => setPasswordRepeat(e.target.value)}
            ></input>
          </div>
          <div className="register-form-group">
            <input
              type="phone"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone Number"
              className="register-input"
              required
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          
          <p id='register-status'></p>
         
          <div className="buttons-div">
            <Link to="/">
              <button renderas="button" className="cancel-button">
                <img
                  src={CancelButton}
                  alt="cancel"
                  className="register-button"
                />
              </button>
            </Link>
            <button onSubmit={submitHandler} className="register-button">
              <img
                src={RegisterButton}
                alt="register"
                className="register-button"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;

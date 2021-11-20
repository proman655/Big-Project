import React from "react";
import { useState } from "react";
import Logo from "../pictures/logo-title-nobg.png";
import LoginButton from "../pictures/login-button.png";
import RegisterButton from "../pictures/register-button.png";
import CancelButton from "../pictures/cancel-button.png"
import RecoverPasswordButton from "../pictures/recover-password-button.png"
import axios from "axios";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";

function MyVerticallyCenteredModal(props) {

  return (
    <Modal className="modal"
      {...props}
      dialogClassName="modal-80w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          Recover Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="new-project-form">
          <Form.Group className="mb-3">
            <Form.Label >Email Address</Form.Label>
            <Form.Control type="email" name="Title" />
          </Form.Group>
          <p id='NewProjectStatus'></p>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="create-project-button">
          <img src={RecoverPasswordButton} alt="submit" id="createProjectButtonImg" />
        </button>
        <button onClick={props.onHide} className="cancel-button2">
          <img src={CancelButton} alt="cancel" id="cancelButtonImg" />
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const LoginScreen = () => {

  const [modalShow, setModalShow] = React.useState(false);
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
        "/api/user/login",
        {
          Email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      if (data) {
        window.location.href = "/home";
      }
    } catch (error) {
      document.getElementById("login-status").innerHTML =
        "Email/password incorrect";
      console.log("ERROR");
    }
  };

  return (
    <div className="div-login">
      <div className="div-login-logo">
        <img src={Logo} alt="logo" className="logo-img" />
      </div>
      <div className="div-login-form">
        <form onSubmit={submitHandler} className>
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
          <button onSubmit={submitHandler} className="login-button">
            <img src={LoginButton} alt="login" id="loginButtonImg" />
          </button>

          <p id="loginStatus"></p>

          <div className="new-user-div">
            <p>New User?</p>
          </div>
          <Link to="/register">
            <button className="register-button">
              <img
                src={RegisterButton}
                alt="register"
                id="registerButtonImg"
              />
            </button>
          </Link>
  
          <p id="forgotPasswordLabel">Forgot Password?</p>
          <a id="forgotPasswordLink" onClick={() => setModalShow(true)}> Click Here </a>
        
        </form>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

    </div>
  );
};

export default LoginScreen;

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import "./RegisterScreen.css";
import Logo from "../../pictures/logo-register.png";

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="div-register">
      <div className="div-register-logo">
        <img src={Logo} alt="logo" className="logo-img" />
      </div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <div className="div-login-form">
        <Form onSubmit={submitHandler}>
          <Form.Group
            className="login-form-group"
            controlId="name"
            style={{
              margin: "10px 0px",
            }}
          >
            <Form.Label></Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicEmail"
            style={{
              margin: "10px 0px",
            }}
          >
            <Form.Label></Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            style={{
              margin: "10px 0px",
            }}
          >
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="confirmPassword"
            style={{
              margin: "10px 0px",
            }}
          >
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{
              margin: "10px 0",
            }}
            className="loginButton"
            size="lg"
            variant="primary"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <div className="new-user-div">New User?</div>
        <Link to="/login">
          <Button
            style={{
              margin: "0px 0px",
              marginBottom: "5px",
            }}
            className="loginButton"
            size="lg"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;

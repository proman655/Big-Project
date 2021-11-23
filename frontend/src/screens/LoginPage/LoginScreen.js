import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Logo from "../../pictures/logo-title-nobg.png";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="div-login">
      <div className="div-login-logo">
        <img src={Logo} alt="logo" className="logo-img" />
      </div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div className="div-login-form">
        <Form onSubmit={submitHandler}>
          <Form.Group
            controlId="formBasicEmail"
            className="login-form-group"
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
            className="login-form-group"
            style={{
              margin: "30px 0px",
            }}
          >
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            style={{
              margin: "10px 0px",
            }}
            className="loginButton"
            size="lg"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
      <div>
        <div className="new-user-div">New User?</div>
        <Link to="/register">
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
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;

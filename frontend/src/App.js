import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home/home.js";
import Login from "./login/LoginScreen.js";
import Register from "./register/RegisterScreen.js";
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

class App extends React.Component {
  state = {
    isLog: false,
  };

  handleLogin = (isLog) => this.setState({ isLog });

  render() {
    const { isLog } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

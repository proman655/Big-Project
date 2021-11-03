import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './login/login.js'
import Register from './register/register.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact pathh='/register' component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;

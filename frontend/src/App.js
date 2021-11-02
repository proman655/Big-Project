import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Login from './login/login.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

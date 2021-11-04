import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './home/home.js';
import Login from './login/login.js'
import Register from './register/register.js'
//import './App.css';

class App extends React.Component{

  state = {
    isLog:false
  }

  handleLogin = (isLog) => this.setState({isLog})

  render(){
    const {isLog} = this.state;
    return(
      <div>
        <Switch>
          <Route exact path='/' render={() => !isLog ? <Login isLogin = {this.handleLogin}/> : <Home/>}/>
          <Route exact pathh='/register' component={Register}></Route>
        </Switch>
      </div >
    )
  }
}

export default App;

import React, { Component } from 'react';

import NormalLoginForm from './components/login/Login'
import RegistrationForm from './components/register/Register'

import './App.css';
import 'antd/dist/antd.css';
import Chat from './components/chat/Chat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>CodeSync</h1>
        {/* <RegistrationForm/> */}
        {/* <div className="login-form"><NormalLoginForm/></div> */}
        <Chat/>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react'
import SockClient from '../ws/sock-client';
export default class Login extends Component {

  componentDidMount(){
    var self = this;
    this.pubsub = new SockClient("ws://localhost:8080/echo")
    // setTimeout(()=>{
    //   self.pubsub.publish({text: "Hello"});
    // }, 3000);


    self.pubsub.suscribe((msg)=>{
      console.log(msg);
    })

  }

  render () {
    return (
    <div className="login-form">
      <form>
        <div className="username-input">
          <label htmlFor="username">Username</label>
            <input type="text" name="" id="username"/>
        </div>
        <div className="password-input">
          <label htmlFor="password">Password</label>
            <input type="password" name="" id="password"/>
        </div>
        <div className='submit-button'>
          <input type="submit" name="Submit" value="Submit" id=""/>
        </div>
      </form>
    </div>
    )
  }
}
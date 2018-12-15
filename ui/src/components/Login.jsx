import React, {Component} from 'react'

export default class Login extends Component {
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
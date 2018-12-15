import React,{Component} from 'react';
import './chat.css'

export default  function Message (props){

    const {message, user, showUser} = props;
    return(
      <div className='chat-msg'  showUser={`${showUser}`}>
        <div className='chat-msg-container' me={`${user=="me"}`}>
          {showUser ? 
            <div className='chat-msg-user'>
              {user}
            </div>: null
          }
          <div className='chat-msg-content'>
            {message}
          </div>
        </div>
      </div>
    )
}
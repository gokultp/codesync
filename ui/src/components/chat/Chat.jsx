import React from 'react';
import Message from './Message'
import {
  Form, Input, Button
} from 'antd';

export default class Chat extends React.Component {
  state={
    messages:[
      {user: 'me', message:'Hiii'},
      {user: 'gokul', message:'Hiii'},
      {user: 'me', message:'Rerum sed enim dolorum blanditiis et. Sed est sapiente voluptatem. Ab nesciunt quia voluptatem nesciunt. Ipsa non omnis voluptas dolores fuga nulla sapiente. Aliquam consequatur nemo expedita distinctio aut quo magni. Fugiat enim voluptate fugit eveniet esse aspernatur atque voluptatem. https://duckduckgo.com/?q=lorem+ipsum&t=canonical&atb=v140-7a_&ia=answer&iax=answer'},
      {user: 'me', message:'Zbhgdg'},
      {user: 'gokul', message:'aaaaaaaaa'}

    ]
  }
  showUser(i){
    const {messages} = this.state;
    if(i > 0){
      return messages[i].user != messages[i-1].user;
    }
    return true;
  }

  render() {
    const {messages} = this.state;
    return (
      <div className="chat">
        {messages.map((msg, i)=>{
          return (
          <Message user={msg.user} message={msg.message} key={i} showUser={this.showUser.call(this, i)}/>
        )})}
      </div>
    );
  }
}
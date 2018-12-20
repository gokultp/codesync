import React from 'react';
import Message from './Message'
import ChatInput from './Input';
import ShowCall from './showCall';
import {
  Form, Input, Button
} from 'antd';

export default class Chat extends React.Component {
  state={
    messages:[
    ], 
    showCall:false,
    msg: ''
  }

  componentDidMount(){
    
    let {messages} = this.state;
    this.props.conn.on('data', function(data){
      let msg = JSON.parse(data);
      if(msg.type == 'chat'){
        messages.push({user: self.props.contact.name, message: msg.data});
        self.setState({messages});
      }
    });

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    const self = this;
    this.props.peer.on('call', call=>{
      self.call = call;
      self.setState({showCall: true});
    })

  }

  SendMsg(msg){
    let {messages} = this.state;
    let data = JSON.stringify({type: 'chat', data: msg})
    this.props.conn.send(data);
    messages.push({user: 'me', message: msg});
    this.setState({messages, msg:''});
  }

  onAnswer(){
    let self = this;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true, audio: true}, function(stream) {
      self.call.answer(stream);
      self.call.on('stream', rStream=>{
        self.setState({videoSrc: window.URL.createObjectURL(rStream), showCall: false})
      })
    })
  }

  onDecline(){
    this.call.close();    
    this.setState({video_url: null, showCall: false})

  }



  showUser(i){
    const {messages} = this.state;
    if(i > 0){
      return messages[i].user != messages[i-1].user;
    }
    return true;
  }

  onTxtChange(evt){
    this.setState({msg: evt.target.value});
  }

  onCall(){
    let self =this;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true, audio: true}, function(stream) {
      var call = self.props.peer.call(self.props.contact.id, stream);
      call.on('stream', function(remoteStream) {
        self.setState({videoSrc: window.URL.createObjectURL(remoteStream), showCall: false})
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
  }

  render() {
    const {messages, videoSrc, showCall, msg} = this.state;
    return (
      <div className="chat">
        {videoSrc?        
          <video src={videoSrc} autoPlay={true} className='chat-video'/>
          :null
        }
        {messages.map((msg, i)=>{
          return (
          <Message user={msg.user} message={msg.message} key={i} showUser={this.showUser.call(this, i)}/>
        )})}
        <ChatInput text={"Send"} onSend={this.SendMsg.bind(this, msg)} value={msg} onChange={this.onTxtChange.bind(this)} onCall={this.onCall.bind(this)}/>

        {showCall? 
          <ShowCall caller={this.props.contact} onAnswer={this.onAnswer.bind(this)} onDecline={this.onDecline.bind(this)}/>:
          null
        }
        
      </div>
    );
  }

}
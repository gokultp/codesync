import React, { Component } from 'react';

import NormalLoginForm from './components/login/Login'
import RegistrationForm from './components/register/Register'

import './App.css';
import 'antd/dist/antd.css';
import Chat from './components/chat/Chat';
import CotactList from './components/contacts/ContactList';
import Peer from 'peerjs';
import ShowCall from './components/chat/showCall';

class App extends Component {
  state ={
    contacts : [
        {name: 'Gokul', id: 'gokulasdf'},
        {name: 'Abhishek', id: 'abhishekzxcv'}
    ],
    showChat: false,
    showCall: false
  }

  componentDidMount(){
    let self = this;
    let {messages, contacts} = this.state;
    let me = 'abhishekzxcv';
    if(window.location.hash=="#1"){
      me = 'gokulasdf'; 
    }
    this.setState({me});
    this.peer = new Peer(me, {key: 'myapikey'}); 
    this.peer.on('connection', function(conn) {
      self.conn = conn;
      let contact = contacts.find(c=> c.id == conn.peer);
      self.setState({selectedContact: contact, showChat: true});
    });
  }
  

  onSelectContact(contact){
    this.conn = this.peer.connect(contact.id);
    this.setState({selectedContact: contact, showChat: true});
  }


  render() {
    let {contacts, showChat, me, selectedContact} = this.state;
    contacts = contacts.filter(c=> c.id != me);
    return (
      <div className="App">
        <h1>CodeSync</h1>
        {/* <RegistrationForm/> */}
        {/* <div className="login-form"><NormalLoginForm/></div> */}
        {showChat?
          <Chat contact={selectedContact} peer={this.peer} conn={this.conn}/>:
          <CotactList onSelect={this.onSelectContact.bind(this)} contacts={contacts}/>
        }
        
      </div>
    );
  }
}

export default App;

import React,{Component} from 'react';
import './contacts.css';
import Contact from './Contact';

export default class ContactList extends Component{
   

    render(){
        return(
            <div className='contact-list'>
                {this.props.contacts.map((contact, i)=>(
                    <Contact {...contact} key={i} onClick={this.props.onSelect.bind(this, contact)}/>
                ))}

            </div>
        )
    }
}
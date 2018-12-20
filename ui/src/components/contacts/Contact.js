import React from 'react';
import './contacts.css';

const Contact = (props)=>(
    <div className='contact' onClick={props.onClick}>
        <div className='contact-pic'>
            {props.name[0]}
        </div>
        <div className='contact-name'>
            {props.name}
        </div>
    </div>
);

export default Contact;
import React from 'react';
import './chat.css'

export default function ShowCall(props){
    return(
        <div className='show-call'>
            {props.caller.name} Calling You.
            <div>
                <button className='call-accept' onClick={props.onAnswer}>Accept</button>
                <button className='call-decline' onClick={props.onDecline}>Decline</button>
            </div>
        </div>
    );
}


import React from 'react';

const ChatInput = (props) =>{
    return(
        <div className='chat-input-container'>
            <textarea className='chat-input-text'value={props.value} onChange={props.onChange}>

            </textarea>
            <div className='chat-input-action'>
                <button onClick={props.onSend}>
                        Send
                </button>
            </div>
            <div className='chat-input-action'>
                <button onClick={props.onCall}>
                    Call
                </button>
            </div>
        </div>
    )
}


export default ChatInput;
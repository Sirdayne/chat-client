import {useState} from 'react'

export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    function sendMessage() {
        setMessages([...messages, message])
        setMessage('')
    }

    return (
        <div className="chat">
            <div className="chat-container">
                <div className="chat-inner">
                    {messages.map((msg) =>
                    <div className="chat__message"
                         key={msg}>
                         <span className="chat__message__author">Author: </span>
                         {msg}
                    </div>)}
                </div>
                <div className="chat-input">
                    <input value={message}
                           onChange={e => {setMessage(e.target.value)}}
                           type="text"/>
                    <button className="btn"
                            disabled={message.length === 0 || message.length > 100}
                            onClick={(e) => sendMessage()}>SEND</button>
                </div>
            </div>
        </div>
    );
}

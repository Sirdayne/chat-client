import {useState, useEffect, useRef} from 'react'

export default function Chat({ user }) {
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useRef()

    function sendMessage() {
        const msg = {
            email: user.email,
            message: inputValue,
            date: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(msg))
        setInputValue('')
    }

    useEffect(() => {
        if (user && user.email) {
            socket.current = new WebSocket('ws://localhost:5000')

            socket.current.onopen = () => {
                const msg = {
                    event: 'connection',
                    email: user.email,
                    date: Date.now()
                }
                socket.current.send(JSON.stringify(msg))
            }

            socket.current.onmessage = (event) => {
                const msg = JSON.parse(event.data)
                setMessages(prev => [msg, ...prev])
            }

            socket.current.onclose = () => {

            }

            socket.current.onerror = () => {

            }
        }
    }, [user])

    return (
        <div className="chat">
            <div className="chat-container">
                <div className="chat-inner">
                    {messages.map((msg) =>
                    <div className="chat__message"
                         key={msg.date}>
                        <span className="chat__message__time">
                            [{new Date(parseInt(msg.date)).getHours()}:{new Date(parseInt(msg.date)).getMinutes()}]
                        </span>
                        {
                            msg.event === 'connection' ? <span><span className="chat__message__author">{msg.email}</span> entered chat!</span>
                            : <span><span className="chat__message__author">{msg.email}: </span>{msg.message}</span>
                        }
                    </div>)}
                </div>
                <div className="chat-input">
                    <input value={inputValue}
                           onChange={e => {setInputValue(e.target.value)}}
                           type="text"/>
                    <button className="btn"
                            disabled={inputValue.length === 0 || inputValue.length > 100}
                            onClick={(e) => sendMessage()}>SEND</button>
                </div>
            </div>
        </div>
    );
}

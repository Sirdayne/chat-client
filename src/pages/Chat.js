import {useState, useEffect, useRef} from 'react'

export default function Chat({ user }) {
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useRef()

    function sendMessage() {
        const msg = {
            event: 'message',
            user_id: user.id,
            email: user.email,
            message: inputValue,
        }
        socket.current.send(JSON.stringify(msg))
        setInputValue('')
    }

    useEffect(() => {
        if (user && user.email) {
            socket.current = new WebSocket(process.env.REACT_APP_WS)

            socket.current.onopen = () => {
                const msg = {
                    event: 'connection',
                    user_id: user.id,
                    email: user.email,
                }
                socket.current.send(JSON.stringify(msg))
            }

            socket.current.onmessage = (event) => {
                const msg = JSON.parse(event.data)
                if (msg.event === 'get-all-messages') {
                    setMessages([...msg.messages])
                } else {
                    setMessages(prev => [msg, ...prev])
                }
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
                         key={msg.id}>
                        <span className="chat__message__time">
                            [{new Date(msg.created_at).toTimeString().slice(0, 5)}]
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

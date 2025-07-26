import { useEffect, useRef, useState } from "react";
import style from "./style.module.css"
import { useUserStore } from "../../store/UserStore";
import socket from "../../utils/socket";

interface IMessage {
    sender: string;
    text: string;
}

interface ChatProps{
    lobbyId: string | undefined
    count: number
}


const Chat = (props: ChatProps) => {
    
    const lobbyId = props.lobbyId
    const count = props.count
    const user = useUserStore(state => state.userStore)
    if (!user || !user.id){
        throw new Error ('Пользователь не авторизован')
    }
    
    const lobbyInfo = {lobbyId: lobbyId, userId: user.id, count: count}   
    
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lobbyId) {
            // console.log(count);
            socket.emit('joinLobby', lobbyInfo); 

            socket.on('messages', (message) => {
                setMessages((prev) => [...prev, message]);
            });
            // console.log('sigma');
            
            return () => {
                socket.off('joinLobby');
                socket.off('message'); 
            };
        }
    }, [lobbyId])

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = (messageText: string) => {
        if (messageText.trim() === '') return;
        const message = {sender: user?.username, text: messageText};
        socket.emit('message',{ lobbyId, ...message}); 
    };

    return(
        <div className={style.chat}>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                ))}
                <div ref={messageEndRef} /> 
            </div>
            <input 
                type="text" 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const inputElement = e.target as HTMLInputElement; 
                        sendMessage(inputElement.value);
                        inputElement.value = ""; 
                    }
                }} 
            />
        </div>
    )
}

export default Chat
import {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {useNavigate} from "react-router-dom";
import "./component/css/Chat.css";
import {CustomButton} from "./component/MyStyle";
import Api from "./customApi";

var stompClient = null;
function Chat() {
    const ws = useRef(null);

    const navigate = useNavigate();

    const client = useRef(null);
    const [connected, setConnected] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [sender, setSender] = useState();

    function connect() {

        var socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            console.log(sender);

            stompClient.send('/app/chat/in', {}, JSON.stringify({ sender: sender }));
            stompClient.subscribe('/topic/message', function (message) {
                setChatMessages((prevState) => [
                    ...prevState,
                    { message: message.body }
                    ]);
            });

        });
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }

    function sendMessage() {
        if (stompClient !== null && client.current.value) {
            const message = client.current.value;

            stompClient.send('/app/chatting', {}, JSON.stringify({ sender: sender, message: message }));
            client.current.value = "";
        }
    }


    useEffect(() => {
        Api.get('/me')
            .then(res => {
                setSender(res.data.email);
            });
    },[]);

    useEffect(() => {
        if (sender) {
            connect();
        }
        return () => {
            disconnect();
        };
    }, [sender]);


    return (
        <div className="chat-container">

            <header className="head">
                <a href={`/`} onClick={(e) => {
                    e.preventDefault();
                    navigate('/')}}>
                    <img src={process.env.PUBLIC_URL + '/head.png'} alt="head" /></a>
            </header>

            <div className="message-box">
            {chatMessages.map((chatMessage, i) => (
                <div key={i} className="chat">
                    <p className="sender">{chatMessage.message.substring(0,chatMessage.message.indexOf("*"))}</p>
                    <p className="message">{chatMessage.message.substring(chatMessage.message.indexOf("*") + 1)}</p>
                </div>
                ))}
            <div>


            <div className="send-box">
            <input type="text" ref={client} />
            <CustomButton className="send-button" onClick={()=>{
                sendMessage();
            }}>전송</CustomButton>
            </div>
        </div>
            </div>
        </div>
    )
}

export default Chat;
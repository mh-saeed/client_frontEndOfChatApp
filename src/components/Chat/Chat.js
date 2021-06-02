import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import { DoDecrypt, DoEncrypt } from "../AES";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const ENDPOINT = 'https://mh-saeed-chat-app.herokuapp.com/';
// const ENDPOINT = "http://localhost:5000/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    var connectionOptions =  {
      "force new connection" : true,
      "reconnectionAttempts": "Infinity", 
      "timeout" : 10000,                  
      "transports" : ["websocket"]
  };
  this.socket = io.connect(ENDPOINT,connectionOptions);
    // socket = io.connect(ENDPOINT,{ transports: ['websocket', 'polling', 'flashsocket'] });

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message); 

      //-------------------decypt------------------------
      
      const ans = DoDecrypt(message.text, message.user);
       let temp = messages;
      temp.push({
        user: message.user,
        text: ans,
      });
      setMessages(() => [...temp]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {

      //-------------------ecypt------------------------


      const ans = DoEncrypt(message);//encryption

      socket.emit("sendMessage", ans, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;

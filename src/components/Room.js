import React from 'react';
import MessageList from './MessageList'
import MessageBar from './MessageBar'
import './../App.css';


const Room = ({messages, roomName, url, auth}) =>
    <div name="room" className="App">
        <div className="App-MessageList">
            <MessageList messages={messages}/>
        </div>
        <MessageBar roomName={roomName} url={url} auth={auth}/>
    </div>;

export default Room;

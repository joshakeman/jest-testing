import React from 'react'
import './../App.css';

const RoomList = (props) => {
    let rooms = props.rooms.map((room) => {
        let style = {
            fontWeight: room === props.activeRoom ? "bold" : "normal",
            paddingRight: "10px",
            paddingLeft: "10px"
        };
        return <li className="unselectable"
                   key={room}
                   style={style}
                   onClick={() => {
                       props.onRoomChange(room)
                   }}>{room}</li>;
    });
    return rooms;
};

export default RoomList

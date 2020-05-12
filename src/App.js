import React, {Component} from 'react';
import Sidebar from 'react-sidebar';
import './App.css';
import LoginBar from './components/LoginBar'
import Room from './components/Room'
import axios from 'axios'
import RoomList from "./components/RoomList";

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : 'http://saarsayfan.pythonanywhere.com/';

class App extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            rooms: [],
            roomName: 'room0',
            messages: [['!ALERT', 'SYSTEM', 'Not Logged In']]
        };
    }

    onLogin = (authToken) => {
        this.setState({...this.state, authToken: authToken});
        this.getRooms();
    };

    onRoomChange = (room) => {
        this.setState({...this.state, roomName: room});
    };

    getRooms = () => {
        const config = {headers: {Authorization: this.state.authToken}};
        return axios.get(`${url}/rooms`, config)
            .then((data) => {
                this.setState({...this.state, rooms: data.data.result});
                this.joinRooms(data.data.result);
            })
            .catch(e => console.log(e));
    };

    joinRooms = (rooms) => {
        const config = {headers: {Authorization: this.state.authToken}};
        console.log(rooms[0]);
        axios.post(`${url}/room_member/${rooms[0]}`, {}, config)
            .then((data) => data)
            .catch(e => console.log(e))
            .then(this.timer = setInterval(() => this.fetchMessages(), 1000));
        for (let i = 1; i < this.state.rooms.length; i++) {
            axios.post(`${url}/room_member/${rooms[i]}`, {}, config)
                .then((data) => data)
                .catch(e => console.log(e));
        }
    };

    fetchMessages = () => {
        let room = this.state.roomName;
        console.log("Fetch Messages: " + room);
        const config = {headers: {Authorization: this.state.authToken}};
        const end = new Date().toISOString();
        let start = new Date();
        start.setDate(start.getDate() - 10000);
        start = start.toISOString();

        axios.get(`${url}/messages/${room}/${start}/${end}`, config)
            .then((response) => {
                this.setState({...this.state, messages: response.data.result})
            })
            .catch(e => console.log(e));
    };

    render() {
        let roomList = <RoomList rooms={this.state.rooms}
                                 onRoomChange={this.onRoomChange}
                                 activeRoom={this.state.roomName}/>;
        const styles = {content: {'overflowY': 'hidden'}};
        return (
            <div className="App">
                <Sidebar sidebar={roomList} docked={true} pullRight={true} styles={styles}>
                    <LoginBar url={url} onLogin={this.onLogin}/>
                    <Room messages={this.state.messages}
                          roomName={this.state.roomName}
                          url={url}
                          auth={this.state.authToken}/>
                </Sidebar>
            </div>
        )
    }
}


export default App;

import React, {Component} from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import './../App.css';

class MessageBar extends Component {
    constructor(props) {
        super(props);
        this.state = {message: ''}
    }

    handleChange = () => {
        return (event) => {
            this.setState({...this.state, message: event.target.value});
        }
    };

    handleSubmit = (event) => {
        const config = { headers: {Authorization: this.props.auth}};
        axios.post(`${this.props.url}/message/${this.props.roomName}`, {message: this.state.message}, config)
            .then((data) => data)
            .then((data) => this.setState({...this.state, message: ''}))
            .catch(e => console.log(e));
        event.preventDefault();
    };

    render = () => {
        return (
            <form className="App-MessageBar" onSubmit={this.handleSubmit}>
                <input className="App-MessageBox form-control" type="text" value={this.state.message}
                       onChange={this.handleChange()}/>
                {/*<input className="send" type="submit" value="Send"/>*/}
                <Button className="App-SendButton" bsStyle="primary" bsSize="small" type="submit">Send</Button>
            </form>
        )
    }
}

export default MessageBar

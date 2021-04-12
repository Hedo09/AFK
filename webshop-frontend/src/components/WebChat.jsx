import React from 'react';

import '../util/util.js'
import urls from "../util/constants";

class WebChat extends React.Component {
    state = {
        history: [],
        name: '',
        message: ''
    };

    receiveMessage = (msg) => {
        let newHistory = [...this.state.history, msg];
        this.setState({history: newHistory});
    };

    sendMessage = (msg) => {
        if (this.websocket !== undefined)
            this.websocket.send(msg);
    };

    componentDidMount() {
        this.websocket = new WebSocket(urls.CHAT_URL);
        this.websocket.onmessage = (event) => {
            this.receiveMessage(event.data)
        };
    }

    messageOnChange = (e) => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    };

    buttonOnClick = (e) => {
        this.sendMessage(this.state.name + ': ' + this.state.message);
    };

    render() {
        return (
            <div className="jumbotron">
                <div className="row">
                    <h2>Ask for help...</h2>

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" className="form-control" onChange={this.messageOnChange}/>
                        <label htmlFor="message">Message:</label>
                        <input id="message" type="text" className="form-control" onChange={this.messageOnChange}/>
                        <button className="btn btn-defaultt"><span className="glyphicon glyphicon-envelope"
                                                                   onClick={this.buttonOnClick}/>
                        </button>
                    </div>

                    <textarea className="form-control message-history" readOnly={true}
                              value={this.state.history.reduce((acc, val) => acc + val + '\n', '')}/>
                </div>
            </div>
        );
    }
}

export default WebChat;
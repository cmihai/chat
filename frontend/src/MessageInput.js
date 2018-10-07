import React, { Component } from 'react';
import './MessageInput.css';

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    render() {
        return <div className="MessageInput">
            <div className="flex-1">
                <input className="full-width" type="text" id="text" onChange={(e) => this.setState({ message: e.target.value })} />
            </div>
            <div>
                <button id="send" onClick={() => {
                    this.props.sendMessage(this.state.message);
                    document.getElementById('text').value = '';
                }}>Send</button>
            </div>
        </div>;
    }
}

export default MessageInput;
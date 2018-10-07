import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

import './MessageInput.css';

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    sendMessage = () => {
        this.props.sendMessage(this.state.message);
        document.getElementById('text').value = '';
    }

    render() {
        return <div className="MessageInput">
            <div className="flex-1">
                <TextField className="full-width" autoFocus={true} id="text"
                           onChange={(e) => this.setState({ message: e.target.value })}
                           onKeyUp={
                               (e) => {
                                   if (e.keyCode == 13) {
                                       this.sendMessage();
                                   }
                               }
                           }
                           />
            </div>
            <div>
                <Button id="send" onClick={this.sendMessage}>Send</Button>
            </div>
        </div>;
    }
}

export default MessageInput;
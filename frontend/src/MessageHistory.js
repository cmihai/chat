import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import './MessageHistory.css';

class MessageHistory extends Component {
    render() {
        let messages = [];

        for (let msg of this.props.messages) {
            messages.push(<Card className="card" key={msg.key}>
                    <Typography variant="caption">{msg.userName}</Typography>
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography variant="caption">{msg.dateString}</Typography>
                </Card>
            );
        }

        return <div className="message-history">{messages}</div>;
    }
}

export default MessageHistory;
import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import './MessageHistory.css';

class MessageHistory extends Component {

    componentDidUpdate() {
        let card = document.querySelector('.card:last-child');
        if (!card)
            return;

        card.scrollIntoView();
    }

    render() {
        let messages = [];

        for (let msg of this.props.messages) {
            let cardClass = "card";

            if (msg.userId === this.props.userId) {
                cardClass += " your-message";
            }

            messages.push(
                <Card className={cardClass} key={msg.key}>
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
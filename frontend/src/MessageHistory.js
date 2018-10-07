import React, { Component } from 'react';

class MessageHistory extends Component {
    render() {
        let messages = [];

        for (let msg of this.props.messages) {
            let key = `${msg.timestamp}@${msg.userId}`;

            messages.push(<div className="message" key={key}>
                <div className="message-user">{msg.userName}</div>
                <div className="message-contents">{msg.text}</div>
            </div>);
        }

        return <div className="message-history">{messages}</div>;
    }
}

export default MessageHistory;
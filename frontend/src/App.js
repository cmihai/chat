import React, { Component } from 'react';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';
import { Message } from './models';
import './App.css';
import { API_ROOT } from './config';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    setInterval(this.loadMessages.bind(this), 200);
  }

  /**
   * Retrieve messages from server in chronological order
   */
  loadMessages() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        let messages = JSON.parse(req.responseText).map((m) => new Message(m));

        // Do not update state if not necessary
        if (messages.length === this.state.messages.length)
          return;

        this.setState({
          messages: messages
        });
      }
    };
    req.open('GET', `${API_ROOT}messages`);
    req.send();
  }

  /**
   * Send message to server (fire-and-forget)
   * @param {Message} message
   */
  putMessage(message) {
    let req = new XMLHttpRequest();
    req.open('PUT', `${API_ROOT}messages`);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(message));
  }

  sendMessage = (text) => {
    let newMessages = this.state.messages.slice(),
        timestamp = new Date().getTime(),
        userName = 'Bob',
        userId = '12345',
        message = new Message({
          userName: userName,
          userId: userId,
          text: text,
          timestamp: timestamp,
        });

    this.putMessage(message);
  };

  render() {
    return (
      <div className="App">
        <div className="history-container">
          <MessageHistory messages={this.state.messages} />
        </div>
        <div className="input-container">
          <MessageInput sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default App;

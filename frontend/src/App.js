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
      messages: [],
      userName: props.userName,
      userId: props.userId,
    };
  }

  componentDidMount() {
    setTimeout(this.loadMessages.bind(this), 100);
  }

  /**
   * Retrieve messages from server in chronological order
   */
  loadMessages() {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.readyState !== 4)
        return;

      setTimeout(this.loadMessages.bind(this), 100);

      if (req.status !== 200)
        return;

      let messages = JSON.parse(req.responseText).map((m) => new Message(m));

      // Do not update state if not necessary
      if (messages.length === this.state.messages.length)
        return;

      this.setState({
        messages: messages,
        userName: this.props.userName,
        userId: this.props.userId,
      });
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
    let timestamp = new Date().getTime(),
        message = new Message({
          userName: this.props.userName,
          userId: this.props.userId,
          text: text,
          timestamp: timestamp,
        });

    this.putMessage(message);
  };

  render() {
    return (
      <div className="App">
        <div className="history-container">
          <MessageHistory messages={this.state.messages} userId={this.props.userId} />
        </div>
        <div className="input-container">
          <MessageInput sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default App;

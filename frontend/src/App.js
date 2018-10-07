import React, { Component } from 'react';
import MessageHistory from './MessageHistory';
import MessageInput from './MessageInput';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  sendMessage = (text) => {
    let newMessages = this.state.messages.slice(),
        timestamp = new Date().getTime(),
        userName = 'Bob',
        userId = '12345';

    newMessages.push({
      userName: userName,
      userId: userId,
      text: text,
      timestamp: timestamp,
    });

    this.setState({
      messages: newMessages
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-history-container">
          <MessageHistory messages={this.state.messages} />
        </div>
        <div className="App-input-container">
          <MessageInput sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default App;

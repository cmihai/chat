import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Registration from './Registration';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
const uuidv4 = require('uuid/v4');

const root = document.getElementById('root');

function handleRegister(userName) {
    let uuid = uuidv4();

    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', uuid);

    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(<App userName={userName} userId={uuid} />, root);
}

function initialize() {
    let userName = localStorage.getItem('userName'),
        userId = localStorage.getItem('userId');

    if (userName && userId) {
        ReactDOM.render(<App userName={userName} userId={userId} />, root);
    } else {
        ReactDOM.render(<Registration onRegister={handleRegister} />, root);
    }
}

initialize();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

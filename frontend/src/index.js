import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Registration from './Registration';
import * as serviceWorker from './serviceWorker';
import { getCookies, setCookies } from './utils';
import { API_ROOT } from './config';

const uuidv4 = require('uuid/v4');

const root = document.getElementById('root');

function handleRegister(userName) {
    let uuid = uuidv4();

    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open('POST', `${API_ROOT}register/${uuid}`);
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {

            // Save the credentials in-browser
            setCookies({ userName: userName, userId: uuid });
            ReactDOM.unmountComponentAtNode(root);
            ReactDOM.render(<App userName={userName} userId={uuid} />, root);
        }
    }
    req.send();
}

function initialize() {
    let { userName, userId } = getCookies();

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

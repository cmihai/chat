import React, { Component } from 'react';
import { Card, Typography, TextField, Button } from '@material-ui/core';
import './Registration.css';

class Registration extends Component {

    handleRegister() {
        let name = document.getElementById('name').value;

        if (name) {
            this.props.onRegister(name);
        }
    }

    render() {
        return <div className="Registration">
                <Card className="card">
                    <Typography variant="headline" className="headline">React-ive chat</Typography>
                    <Typography variant="body1">Hello! Please introduce yourself:</Typography>
                    <div style={{ display: 'flex', alignContent: 'center'}}>
                        <TextField id="name" label="My name is..." style={{flex: 1}} onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                this.handleRegister();
                            }
                        }}></TextField>
                        <Button onClick={this.handleRegister.bind(this)}>Confirm</Button>
                    </div>
                </Card>
        </div>
    }
}

export default Registration;
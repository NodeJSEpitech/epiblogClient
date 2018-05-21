import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './signin.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton label="Submit" primary onClick={event => this.handleClick(event)} />
        </div>
      </div>
    );
  }
}

export default Signin;

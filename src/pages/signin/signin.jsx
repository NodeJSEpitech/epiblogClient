import React, { Component } from 'react';

/* MATERIAL-UI */
import { Toolbar, ToolbarGroup } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

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
        <Toolbar className="toolbar">
          <ToolbarGroup firstChild="true">
            <RaisedButton icon={
              <FontIcon className="material-icons">keyboard_backspace</FontIcon>
            }
            />
          </ToolbarGroup>
        </Toolbar>
        <div className="login-form">
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

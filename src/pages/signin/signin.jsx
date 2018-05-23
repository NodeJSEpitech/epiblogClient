import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthenticationActions from '../../redux/actions/authentication';
import ApiCallLib from '../../libs/apiCallLib';

/* MATERIAL-UI */
import { Toolbar, ToolbarGroup } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import './signin.css';

const callLib = new ApiCallLib();

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit() {
    //this.props.dispatch(AuthenticationActions.create(this.state));
    callLib.post("/authenticate", this.state)
      .then(response => {
        console.log(response);
        return this.props.dispatch(AuthenticationActions.create(response.data.token))
      }).then(() => this.props.history.push('/'));
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
          <RaisedButton label="Submit" primary onClick={this.handleSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

export default connect()(Signin);

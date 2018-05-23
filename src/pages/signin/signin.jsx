import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

/* MATERIAL-UI */
import { Toolbar, ToolbarGroup, Card, CardText, CardActions } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import AuthenticationActions from '../../redux/actions/authentication';
import ApiCallLib from '../../libs/apiCallLib';

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
    callLib.post('/authenticate', this.state)
      .then(response => (this.props.dispatch(AuthenticationActions.create(response.data.token))))
      .then(() => this.props.history.push('/'))
      .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <div>
        <Toolbar className="toolbar">
          <ToolbarGroup firstChild>
            <FlatButton
              icon={
                <FontIcon className="material-icons">keyboard_backspace</FontIcon>
              }
              onClick={() => { this.props.history.goBack(); }}
            />
          </ToolbarGroup>
        </Toolbar>
        <div className="login-form">
          <Card
            style={{
              marginBottom: '20px',
            }}
          >
            <CardText>
              <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange={(event, newValue) => this.setState({ username: newValue })}
                className="login-form__input"
              />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
                className="login-form__input"
              />
            </CardText>
            <CardActions>
              <RaisedButton label="Sign in" primary onClick={() => { this.handleSubmit(); }} />
            </CardActions>
          </Card>
          <Link to="/signup">{ 'Don\'t have any account yet?' }</Link>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect()(Signin);

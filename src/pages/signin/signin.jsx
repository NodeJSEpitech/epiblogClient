import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* MATERIAL-UI */
import { Toolbar, ToolbarGroup, Card, CardText, CardActions } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import AuthenticationActions from '../../redux/actions/authentication';
import UserActions from '../../redux/actions/user';
import callLib from '../../libs/apiCallLib';

import './signin.css';

// const callLib = new ApiCallLib();

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      firstname: '',
      lastname: '',
      signup: false,
      open: false,
    };
  }

  handleSubmit() {
    if (!this.state.signup) {
      callLib.post('/authenticate', this.state)
        .then(response => (this.props.dispatch(AuthenticationActions.create(response.data.token))))
        .then(() => callLib.get('/me'))
        .then(me => (this.props.dispatch(UserActions.setUser(me.data))))
        .then(() => this.props.history.push('/'))
        .catch(() => { this.setState({ open: true }); });
    } else {
      const tmp = {
        username: this.state.username,
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
        avatar: 'https://www.inbenta.com/wp-content/themes/inbenta/img/icons/avatar.svg?ver=2',
      };
      callLib.post('/user', tmp)
        .then(() => callLib.post('/authenticate', this.state))
        .then(response => (this.props.dispatch(AuthenticationActions.create(response.data.token))))
        .then(() => callLib.get('/me'))
        .then(me => (this.props.dispatch(UserActions.setUser(me.data))))
        .then(() => this.props.history.push('/'))
        .catch(() => { this.setState({ open: true }); });
    }
  }

  renderSignup() {
    return (
      <div>
        <TextField
          type="password"
          hintText="Confirm password"
          floatingLabelText="Confirm password"
          onChange={(event, newValue) => this.setState({ passwordConfirmation: newValue })}
          className="login-form__input"
        />
        <TextField
          hintText="Enter your first name"
          floatingLabelText="First name"
          onChange={(event, newValue) => this.setState({ firstname: newValue })}
          className="login-form__input"
        />
        <TextField
          hintText="Enter your last name"
          floatingLabelText="Last name"
          onChange={(event, newValue) => this.setState({ lastname: newValue })}
          className="login-form__input"
        />
        <TextField
          type="email"
          hintText="Enter your Email"
          floatingLabelText="Email"
          onChange={(event, newValue) => this.setState({ email: newValue })}
          className="login-form__input"
        />
      </div>
    );
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
        <div className={`login-form-wrapper ${this.state.formState}`}>
          <Card
            style={{
              marginBottom: '20px',
            }}
            className="login-form"
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
              {
                this.state.signup ? this.renderSignup(this) : null
              }
            </CardText>
            <CardActions>
              <RaisedButton label={this.state.signup ? 'Sign up' : 'Sign in'} primary onClick={() => { this.handleSubmit(); }} />
            </CardActions>
          </Card>
          <RaisedButton
            label={this.state.signup ? 'Already have an account ?' : 'Don\'t have an account ?'}
            primary
            onClick={() => { this.setState({ signup: !this.state.signup }); }}
          />
        </div>

        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={() => { this.setState({ open: false }); }}
        >
          {this.state.signup ?
            <div>
              There has been an error with your credentials, please try again, and keep in mind that
              <br />
              Username should only contain letters and numbers, and be least 4 and at most 30 characters long
              <br />
              First and last names are mandatory
              <br />
              password must be containing at least 1 digit, 1 uppercase character, 1 lowercase character, 1 special character (space forbidden), and be between 8 and 15 characters
              <br />
              this email might already be taken
              <br />
              this username might already be taken
            </div>
            :
            <div>
              There has been an error with your credentials, please check them again.
            </div>
          }
        </Dialog>
      </div >
    );
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect()(Signin);

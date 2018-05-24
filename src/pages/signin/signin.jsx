import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      passwordConfirmation: '',
      email: '',
      firstname: '',
      lastname: '',
      signup: false,
    };
  }

  handleSubmit() {
    if (!this.state.signup) {
      callLib.post('/authenticate', this.state)
        .then(response => (this.props.dispatch(AuthenticationActions.create(response.data.token))))
        .then(() => this.props.history.push('/'))
        .catch((err) => { console.log(err); });
    } else {
      const tmp = {
        username: this.state.username,
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
        avatar: 'https://o.aolcdn.com/images/dims3/GLOB/crop/630x315+0+0/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fefe897c49141c93a0c5cd105ebc390fd%2F205192450%2Favatar.jpg',
      };
      callLib.post('/user', tmp)
        .then(() => this.setState({
          firstname: '',
          lastname: '',
          email: '',
          passwordConfirmation: '',
          signup: false,
        }))
        .catch((err) => { console.log(err); });
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
              {
                this.state.signup ? this.renderSignup(this) : null
              }
            </CardText>
            <CardActions>
              <RaisedButton label={this.state.signup ? 'Sign up' : 'Sign in'} primary onClick={() => { this.handleSubmit(); }} />
            </CardActions>
          </Card>
          <RaisedButton label={this.state.signup ? 'Already have an account ?' : 'Don\'t have an account ?'} primary onClick={() => { this.setState({ signup: !this.state.signup }); }} />
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

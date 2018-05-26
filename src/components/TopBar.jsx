import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, FlatButton } from 'material-ui';
import AuthenticationActions from '../redux/actions/authentication';
import UserActions from '../redux/actions/user';

const mapStateToProps = ({ authentication, user }) => ({
  authentication: authentication.get('token'),
  username: user.get('user').username,
});

/* MATERIAL-UI */

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.authentication,
      username: props.username,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      token: nextProps.authentication,
      username: nextProps.username,
    });
  }

  handleLogout() {
    this.props.dispatch(AuthenticationActions.destroy());
    this.props.dispatch(UserActions.destroyUser());
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={`Welcome to ${this.props.title}  ${this.state.username}`}
        iconElementRight={
          this.state.token === null ?
            <Link to="/signin">
              <FlatButton
                label="Sign in"
                labelStyle={{ color: 'white' }}
              />
            </Link>
            :
            <FlatButton
              label="Log out"
              labelStyle={{ color: 'white' }}
              onClick={this.handleLogout}
            />
        }
      />
    );
  }
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  authentication: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TopBar);

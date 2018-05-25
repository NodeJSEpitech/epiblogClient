import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, FlatButton } from 'material-ui';
import AuthenticationActions from '../redux/actions/authentication';

const mapStateToProps = ({ authentication }) => ({
  authentication: authentication.get('token'),
});

/* MATERIAL-UI */

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.authentication,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      token: nextProps.authentication,
    });
  }

  handleLogout() {
    this.props.dispatch(AuthenticationActions.destroy());
  }

  render() {
    console.log(this.props)
    return (
      <AppBar
        showMenuIconButton={false}
        title={this.props.title}
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
};

export default connect(mapStateToProps)(TopBar);

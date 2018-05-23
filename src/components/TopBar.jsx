import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* MATERIAL-UI */
import { AppBar, FlatButton } from 'material-ui';

function TopBar({ title }) {
  return (
    <AppBar
      showMenuIconButton={false}
      title={title}
      iconElementRight={
        <Link to="/signin">
          <FlatButton
            label="Sign in"
            labelStyle={{ color: 'white' }}
          />
        </Link>
      }
    />
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;

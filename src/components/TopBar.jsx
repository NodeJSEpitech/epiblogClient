import React from 'react';
import PropTypes from 'prop-types';

/* MATERIAL-UI */
import { AppBar } from 'material-ui';

function TopBar({ title }) {
  return (
    <AppBar
      showMenuIconButton={false}
      title={title}
    />
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;

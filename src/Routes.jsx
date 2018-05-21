import React from 'react';
import Route from 'react-router/Route';

/* PAGES */
import Home from './pages/home/home';
import Signin from './pages/signin/signin';

function Routes() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
    </div>
  );
}

export default Routes;

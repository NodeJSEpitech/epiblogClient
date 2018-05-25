import React from 'react';
import Route from 'react-router/Route';

/* PAGES */
import Home from './pages/home/home';
import Signin from './pages/signin/signin';
import PostCreate from './pages/post_create/post_create';

function Routes() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/new" component={PostCreate} />
    </div>
  );
}

export default Routes;

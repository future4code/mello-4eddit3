import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from './pages/feed';

import Login from './pages/login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/posts" exact component={Feed} />
      {/* <Route path="/login" component={} />
      <Route path="/cadastro" component={} />

      <Route path="/post:id" component={} /> */}
    </Switch>
  );
}

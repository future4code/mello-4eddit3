import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from './pages/feed';


import Feed from './pages/feed';
import Register from './pages/register';

import Login from './pages/login';


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/registro" component={Register} />
      <Route path="/posts" exact component={Feed} />

      {/* <Route path="/login" component={} />
      <Route path="/cadastro" component={} />

      <Route path="/post:id" component={} /> */}
    </Switch>
  );
}

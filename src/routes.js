import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './pages/register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/registro" component={Register} />
      {/* <Route path="/login" component={} />
      <Route path="/cadastro" component={} />
      <Route path="/posts" component={} />
      <Route path="/post:id" component={} /> */}
    </Switch>
  );
}

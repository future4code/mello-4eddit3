import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from './pages/feed';
import Login from './pages/login';
import Post from './pages/postdetail';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/feed" exact component={Feed} />
      <Route path="/posts/:id">
        <Post />
      </Route>
      {/* <Route path="/login" component={} />
      <Route path="/cadastro" component={} />

       */}
    </Switch>
  );
}

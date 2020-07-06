import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Carrinho from './Pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Carrinho} />
      <Route path="/login" component={} />
      <Route path="/cadastro" component={} />
      <Route path="/posts" component={} />
      <Route path="/post:id" component={} />
    </Switch>
  );
}

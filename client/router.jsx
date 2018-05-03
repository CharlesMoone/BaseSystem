import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Bundle from 'bundle';

import loadHome from 'bundle-loader?lazy&name=Home!./Home';


const Home = () => (
  <Bundle load={loadHome}>
    {Home => <Home />}
  </Bundle>
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/sys' component={Home} />
    </Switch>
  </BrowserRouter>
);
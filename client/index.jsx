import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore
} from 'redux';
import {
  Provider
} from 'react-redux';

import Router from './router';
import Reducer from './reducer';


const store = createStore(Reducer);

ReactDOM.render((
  <Provider store={store}>
    <Router />
  </Provider>
), document.getElementById('root'));
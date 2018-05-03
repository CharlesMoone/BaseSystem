import {
  combineReducers
} from 'redux';

import * as actionTypes from './actionTypes';


const initState = {};

const Home = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SOMEACTIONS:
      return Object.assign({}, state, {
        data: action.data
      });
      break;
    default:
      return state;
  }
}

export default combineReducers({
  Home,
});
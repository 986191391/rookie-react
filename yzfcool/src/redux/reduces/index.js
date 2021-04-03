/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import home from './home';
import gobang from './gobang';

export default combineReducers({
  home,
  gobang
});

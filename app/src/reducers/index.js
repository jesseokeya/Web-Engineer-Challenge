import { combineReducers } from 'redux';
import wasteReducer from './wasteReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  wastes: wasteReducer,
  errors: errorReducer
});
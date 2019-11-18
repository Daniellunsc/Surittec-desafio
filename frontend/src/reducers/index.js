import { combineReducers } from 'redux';
import clienteReducer from './clienteReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  clienteReducer,
  userReducer,
});

export default reducers;

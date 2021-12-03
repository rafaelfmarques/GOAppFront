import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { agendamentoReducer } from './agendamentoReducer';

const reducers = combineReducers({
  authReducer,
  agendamentoReducer,
});

export { reducers };

import { types } from '../types/';

const INITIAL_STATE = {
  auth: {
    token: '',
    autorizacao: '',
    username: '',
  },
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.AUTH:
      return {
        ...state,
        auth: {
          ...state,
          token: action.payload.token,
          autorizacao: action.payload.autorizacao,
          username: action.payload.username,
        },
      };

    case types.LOGOUT:
      return {
        ...state,
        auth: {
          ...state,
          token: '',
          autorizacao: '',
          username: '',
        },
      };
    default:
      return state;
  }
};

export { authReducer };

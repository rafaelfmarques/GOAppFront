import { types } from '../types/';

const INITIAL_STATE = {
  agendamento: {
    limite_users: null,
  },
};

const agendamentoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LIMITE_USERS:
      return {
        ...state,
        agendamento: {
          ...state.agendamento,
          limite_users: action.payload.limite,
        },
      };
    default:
      return state;
  }
};

export { agendamentoReducer };

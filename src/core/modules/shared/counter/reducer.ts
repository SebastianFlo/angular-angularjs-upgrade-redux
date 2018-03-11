import { ActionTypes, State } from './types';

const initialState: State = {
  counter: 0
};

export const counterReducer = (state: State = initialState, action): State => {
  switch (action.type) {
    case ActionTypes.INCREASE_COUNTER: {
      console.log('reducer increase', state);
      return { ...state, counter: state.counter + 1 };
    }
    case ActionTypes.DECREASE_COUNTER: {
      console.log('reducer decrease');
      return { ...state, counter: state.counter - 1 };
    }
    default:
      return state;
  }
};

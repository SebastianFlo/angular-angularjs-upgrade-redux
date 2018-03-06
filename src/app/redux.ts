import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const vanillaInitialState = {
    counter: 0
};

export interface VanillaAppState {
  counter: number;
}

const vanillaReducer = function (state = vanillaInitialState, action) {
  switch (action.type) {
      case 'INCREASE_COUNTER': {
          return Object.assign({}, state, {
              counter: state.counter + 1
          });
      }
      case 'DECREASE_COUNTER': {
          return Object.assign({}, state, {
              counter: state.counter - 1
          });
      }

      default:
          return state;
  }
};

export const store = createStore(vanillaReducer, applyMiddleware(createLogger()));

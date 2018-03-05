import { createLogger } from 'redux-logger';

const initialState = {
  counter: 0
};


// REDUCER
const AngularJsReducer = function (state = initialState, action) {
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

// ACTIONS
function increaseCounter() {
  return {
    type: 'INCREASE_COUNTER'
  };
}

function decreaseCounter() {
  return {
    type: 'DECREASE_COUNTER'
  };
}

export function AngularJsActions() {
  return {
    increaseCounter,
    decreaseCounter
  };
}

export function reduxConfig($ngReduxProvider) {
  $ngReduxProvider.createStoreWith(AngularJsReducer, [createLogger()]);
}

export function runNgRedux($ngRedux) {
  window['angularJsNgRedux'] = $ngRedux;
}

export function reduxService($ngRedux) {
  return $ngRedux;
}

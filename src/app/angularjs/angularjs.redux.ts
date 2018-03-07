import { createLogger } from 'redux-logger';
import { store } from '../redux';
// const initialState = {
//     counter: 0
// };


// REDUCER
// const AngularJsReducer = function (state = initialState, action) {
//     switch (action.type) {
//         case 'INCREASE_COUNTER': {
//             return Object.assign({}, state, {
//                 counter: state.counter + 1
//             });
//         }
//         case 'DECREASE_COUNTER': {
//             return Object.assign({}, state, {
//                 counter: state.counter - 1
//             });
//         }

//         default:
//             return state;
//     }
// };

function storeProviderEnhancer() {
  return () => store;
}

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

export const AngularJsActions = {
    increaseCounter,
    decreaseCounter
};

export function reduxConfig($ngReduxProvider) {
    // $ngReduxProvider.createStoreWith(AngularJsReducer, [createLogger()], null, initialState); // using ngRedux as a base
    $ngReduxProvider.createStoreWith(state => state, [], [storeProviderEnhancer]); // using native redux as a base
}

export function runNgRedux($ngRedux) {
    window['angularJsNgRedux'] = $ngRedux;
}

export class ReduxService {
    constructor($ngRedux) {
        return $ngRedux;
    }
}

/*
function storeProviderEnhancer() {
  return () => myStore;
}

// ... in AngularJS
$ngReduxProvider.createStoreWith(state => state, [], [storeProviderEnhancer]);

// ... in Angular using angular-redux/store
this.ngRedux.provideStore(store as Store<IAppState>);
*/

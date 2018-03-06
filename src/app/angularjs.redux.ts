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

export const AngularJsActions = {
    increaseCounter,
    decreaseCounter
}

export function reduxConfig($ngReduxProvider) {
    $ngReduxProvider.createStoreWith(AngularJsReducer, [createLogger()], null, initialState);
    console.log('Redux is configured');
}

export function runNgRedux($ngRedux) {
    console.log('Putting redux on window');
    window['angularJsNgRedux'] = $ngRedux;
}

export class ReduxService {
    constructor($ngRedux) {
        console.log('ngRedux Service');
        return $ngRedux;
    }
}


// TODO: Find this thing I found on GitHub

/*
import myStore from '../shared/store'; // initial store setup using plain Redux

function storeProviderEnhancer() {
  return () => myStore;
}

// ... in AngularJS
$ngReduxProvider.createStoreWith(state => state, [], [storeProviderEnhancer]);

// ... in Angular using angular-redux/store
this.ngRedux.provideStore(store as Store<IAppState>);
*/

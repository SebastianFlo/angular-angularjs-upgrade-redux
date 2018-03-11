import { createLogger } from 'redux-logger';
import { store } from './redux';

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

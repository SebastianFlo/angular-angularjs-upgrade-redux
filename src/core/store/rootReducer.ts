import { combineReducers } from 'redux';
import { optimistic } from 'redux-optimistic-ui';

/**
 * Internal dependancies
 */
import { RootState, FullState } from '../rootTypes';
import counterReducer from '../modules/shared/counter';

export function createRootReducer (externalReducers) {
    return combineReducers<FullState>({
        ...externalReducers,
        counterReducer
    });
}

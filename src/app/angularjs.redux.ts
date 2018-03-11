import { logger } from 'redux-logger';
import { store } from './redux';
import Core from '../core';

function storeProviderEnhancer() {
  return () => store;
}

export function reduxConfig($ngReduxProvider) {
  const rootReducer = Core.store.createRootReducer({});
  return $ngReduxProvider.createStoreWith(rootReducer, [logger]);
}

/** @format */

/**
 * Store
 */
import { createRootReducer } from './store/rootReducer';
export * from './rootTypes';

/**
 * Modules
 */

import * as counter from './modules/shared/counter';


const store = {
  createRootReducer
};

const Core = {
  store,
  counter,
};

export default Core;

import { OptimisticState } from 'redux-optimistic-ui';
import { types as CounterTypes } from './modules/shared/counter';

/**
 * Base module implementation
 */
export interface Module {
  types: object;
  actions: object;
  selectors: object;
}

/**
 * FSA-compliant Redux action
 */
export interface RootAction<T, P = object> {
  type: T;
  payload: P;
  meta?: object;
  error?: Error;
}

/**
 * Full state as implemented in modules
 */
export interface RootState {
  orgState: CounterTypes.State;
}

/**
 * Full state but includes any store enhancers state wrapping such as optimistic-ui
 */
export type FullState = { core: OptimisticState<RootState> };

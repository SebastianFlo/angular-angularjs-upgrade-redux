/**
 * Redux action types
 */
export enum ActionTypes {
  INCREASE_COUNTER = 'INCREASE_COUNTER',
  DECREASE_COUNTER = 'DECREASE_COUNTER',
};

/**
* Reducer state
* @type {Object}
*/
export type State = CounterData;

/**
* Raw user data
* @type {Object}
*/
export type CounterData = {
  counter: number
};

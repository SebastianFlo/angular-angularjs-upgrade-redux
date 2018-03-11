import * as types from './types';
import { createAction } from '../../../middleware/api/createAction';

const ActionTypes = types.ActionTypes;

export const increaseCounter = () => createAction(ActionTypes.INCREASE_COUNTER);
export const decreaseCounter = () => createAction(ActionTypes.DECREASE_COUNTER);

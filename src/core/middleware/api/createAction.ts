import { FullState } from '../../rootTypes';
import { AxiosPromise, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';

export type API_ACTION = '@api/ACTION';

export interface Action<T extends string> {
    type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
    payload: P;
}


export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(type: T, payload?: P): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload ? { type, payload } : { type }
}

export type FunctionType = (...args: any[]) => any;

type Select<S> = (state: FullState) => S;

type TransformRequestFn<S> = (state: S) => AnyAction;
type TransformSuccessFn<R, S> = (payload: R, state: S) => AnyAction;
type TransformFailureFn<S> = (payload: Error, state: S) => AnyAction;

export type ResolveFn<R, S> = (state: S) => any | void;
export type CacheKey = string | number;
export type CacheOptions =
    CacheKey
    | { key: CacheKey | object, expireMs?: number }
    | false
    | null;

/**
 * Action dispatch mapping
 *
 * @interface ActionDispatchMapping
 * @template R
 * @template S
 */
interface ActionDispatchMapping<R, S> {
    /**
     * Action creator that will be called right before firing initial API request
     *
     * @type {TransformRequestFn<S>}
     * @memberof ActionDispatchMapping
     */
    request: TransformRequestFn<S>;

    /**
     * Action creator that will be called after a succesful API request
     *
     * @type {TransformSuccessFn<R, S>}
     * @memberof ActionDispatchMapping
     */
    success: TransformSuccessFn<R, S>;

    /**
     * Action creator that will be called after a failed API request
     *
     * @type {TransformSuccessFn<R, S>}
     * @memberof ActionDispatchMapping
     */
    failure: TransformFailureFn<S>;
}

/**
 * Configuration object for async action
 *
 * @interface ConfigFull
 * @template R
 * @template S
 */
interface ConfigFull<R, S> {
    /**
     * Whether or not to rollback the state changes of the request action if the API request action fails
     *
     * @type {boolean}
     * @memberof ConfigFull
     */
    rollback?: boolean;

    /**
     * Cache responses using key and optional expiration time
     * If a response is cached the success promise will be resolved immediatly with the cached response payload
     *
     * Before using this option consider the size of the responses you're caching to avoid memory over-consumption. Memory
     * consumption may be reduced by using a shorter expiration time.
     *
     * @param {S} state
     * @returns {boolean}
     * @memberof ConfigFull
     */
    cache?: CacheOptions;

    /**
     * Use this if you want to resolve a differnet promise value than the one returned from the API call.
     * If a non-void value is returned from this function, no actions will be dispatched.
     *
     * If a response is cached the success promise will be resolved immediatly with the cached response payload
     *
     * @param {S} state
     * @returns {boolean}
     * @memberof ConfigFull
     */
    resolve?: ResolveFn<R, S>;

    /**
     * Object containing action dispatch mappings
     *
     * @type {ActionDispatchMapping<R, S>}
     * @memberof ConfigFull
     */
    actions: ActionDispatchMapping<R, S>;
}

interface ConfigShort<R, S> extends ActionDispatchMapping<R, S> {}

export type Config<R, S> =
    | ConfigFull<R, S>
    | ConfigShort<R, S>;

/**
 * Creates an action for API middleware
 *
 * @export
 * @template R
 * @template S
 * @param {Select<S>} selector - Selector function that selects the state provided to the `callApi` and action creator callbacks
 * @param {CallApi<R, S>} call - Callback for calling remote API endpoint
 * @param {Config<R, S>} config - Configuration object for async action creator
 * @returns {ApiAction<R, S>}
 */

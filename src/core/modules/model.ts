import * as _ from 'lodash';

export default class Model {
    /**
     * Assigns fields to instance and logs warnings at run-time if fields are missing
     * @param {Object} params
     * @param {void}
     */
    required(params: object, fields: string[]): void {
        params = params || {};
        _.forEach(fields, field => {
            const value = params[field];
            const isMissing = _.isNil(value);
            if (isMissing) {
                console.warn(`Required field: '${field}' was not set for model`);
            }
            Object.assign(this, { [field]: value });
        });
    }

    /**
     * Assigns fields to instance
     * @param {Object} params
     * @param {void}
     */
    optional(params: object, fields: string[]): void {
        params = params || {};
        _.forEach(fields, field => {
            const value = params[field];
            Object.assign(this, { [field]: value });
        });
    }

    /**
     * Assigns default values for fields
     * @param {Object} params
     * @param {void}
     */
    defaults(params: object, defaults: object): void {
        params = params || {};
        _.forEach(defaults, (defaultValue, field) => {
            const value = params[field] || defaultValue;
            Object.assign(this, { [field]: value });
        });
    }
}

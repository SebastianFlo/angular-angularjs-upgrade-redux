import * as _ from 'lodash';
import { State, CounterData } from './types';
import Model from '../../model';

export default class Org extends Model {
  public id: number;
  public name: string;

  constructor(params: CounterData) {
    super();
    this.required(params, ['counter']);
    this.optional(params, []);
  }

  /**
   * Creates a new Org instance
   * @param {CounterData} params
   * @return {Org}
   */
  public static create(params: CounterData) {
    return new Org(params);
  }

}

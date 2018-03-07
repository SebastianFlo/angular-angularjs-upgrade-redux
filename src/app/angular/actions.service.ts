import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { VanillaAppState } from '../redux';

@Injectable()
export class ActionsService {

  constructor (private ngRedux: NgRedux<VanillaAppState>) { }

  increase () {
    this.ngRedux.dispatch({ type: 'INCREASE_COUNTER' });
  }

  decrease () {
    this.ngRedux.dispatch({ type: 'DECREASE_COUNTER' });
  }
}

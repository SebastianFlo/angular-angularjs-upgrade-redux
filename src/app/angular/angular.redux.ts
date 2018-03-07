import { Store } from 'redux';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux } from '@angular-redux/store';
import logger from 'redux-logger';

// import { RootReducer } from './reducers';
// import { AppState, INITIAL_STATE } from './store';
// import { ReduxUpgradeService } from './reduxUpgrade.service';

import { store, VanillaAppState } from '../redux';

@NgModule({
    imports: [
        CommonModule,
        NgReduxModule
    ]
})
export class ReduxModule {
  constructor(ngRedux: NgRedux<VanillaAppState>) {
    ngRedux.provideStore(store as Store<VanillaAppState>);
  }
}

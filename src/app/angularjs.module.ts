import * as angular from 'angular';
import ngRedux from 'ng-redux';
import 'angular-route';

import { reduxConfig, runNgRedux, ReduxService, AngularJsActions } from './angularjs.redux';

export const angularJsApp = angular.module('angularJsApp', ['ngRoute', ngRedux]);

angularJsApp
  .config(reduxConfig);

angularJsApp.config(($locationProvider, $routeProvider) => {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/a/ng1', {
    template: '<angular-js-a></angular-js-a>'
  });
  $routeProvider.when('/b/ng1', {
    template: '<angular-js-b></angular-js-b>'
  });
  $routeProvider.otherwise({ template: '' });
});

angularJsApp
  .run(runNgRedux);

angularJsApp
  .service('ReduxService', ReduxService);


angularJsApp.component('angularJsA', {
  controller: class AngularJsAController {
    counter: any;
    redux: any = {};
    increaseCounter;
    decreaseCounter;
    constructor(public $ngRedux) {
      $ngRedux.connect(this.mapStateToThis, { ...AngularJsActions })(this.redux);
      console.log('Initial State is ', $ngRedux.getState());
      $ngRedux.subscribe(() => {
        console.log('state is ', $ngRedux.getState());
      });
    }

    mapStateToThis(state) {
      return {
        counter: state.counter
      };
    }

    increase() {
      this.redux.increaseCounter();
    }

    decrease() {
      this.redux.decreaseCounter();
    }
  },
  template: `
    ANGULARJS RENDERED a/ng1
      <div>
        <a href="/a/ng2">ANGULAR A</a>
        <a href="/b/ng2">ANGULAR B</a>
        <a href="/a/ng1">ANGULARJS A</a>
        <a href="/b/ng1">ANGULARJS B</a>
      </div>
      <div>
        <h3>{{ $ctrl.redux.counter }}</h3>
        <button ng-click="$ctrl.increase()">Increase</button>
        <button ng-click="$ctrl.decrease()">Decrease</button>
      </div>
  `
});

angularJsApp.component('angularJsB', {
  controller: class AngularJsBController {
    constructor() { }
  },
  template: `
  ANGULARJS RENDERED b/ng1
  <div>
    <a href="/a/ng2">ANGULAR A</a>
    <a href="/b/ng2">ANGULAR B</a>
    <a href="/a/ng1">ANGULARJS A</a>
    <a href="/b/ng1">ANGULARJS B</a>
  </div>
  `
});

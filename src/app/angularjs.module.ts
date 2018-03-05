import * as angular from 'angular';
import ngRedux from 'ng-redux';
import 'angular-route';

import { reduxConfig, runNgRedux, reduxService, AngularJsActions } from './angularjs.redux';

export const angularJsApp = angular.module('angularJsApp', ['ngRoute', ngRedux]);

angularJsApp
  .config(reduxConfig);

angularJsApp
  .run(runNgRedux);

angularJsApp
  .service('reduxService', reduxService);


angularJsApp.component('angularJsA', {
  controller: class {
    actions: any = {};
    constructor(public reduxService) {
      reduxService.connect(null, AngularJsActions)(this.actions);
      reduxService.subscribe(() => {
        console.log('state is ', reduxService.getState());
      });
    }

    increase() {
      this.actions.increaseCounter();
    }

    decrease() {
      this.actions.decreaseCounter();
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
        <button ng-click="increase()">Increase</button>
        <button ng-click="decrease()">Decrease</button>
      </div>
  `
});

angularJsApp.component('angularJsB', {
  controller: class {
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



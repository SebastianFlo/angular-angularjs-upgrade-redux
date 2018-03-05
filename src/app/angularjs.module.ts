import * as angular from 'angular';
import 'angular-route';

export const angularJsApp = angular.module('legacy', ['ngRoute']);

angularJsApp.config(($locationProvider, $routeProvider) => {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/a/ng1', {template: `
    ANGULARJS RENDERED a/ng1
    <div>
      <a href="/a/ng2">ANGULAR A</a>
      <a href="/b/ng2">ANGULAR B</a>
      <a href="/a/ng1">ANGULARJS A</a>
      <a href="/b/ng1">ANGULARJS B</a>
    </div>
  `});
  $routeProvider.when('/b/ng1', {template: `
    ANGULARJS RENDERED b/ng1
    <div>
      <a href="/a/ng2">ANGULAR A</a>
      <a href="/b/ng2">ANGULAR B</a>
      <a href="/a/ng1">ANGULARJS A</a>
      <a href="/b/ng1">ANGULARJS B</a>
    </div>
  `});
  $routeProvider.otherwise({template: ''}); // <---- NOTE THIS GUY
});

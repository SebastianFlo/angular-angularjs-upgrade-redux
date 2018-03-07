# Angular Hybrid App Redux State Share

The project assumes you have a AngularJs app already using redux, and want to upgrade it.

There are 2 options you have here:

1. (requires less rewriting of your old app) Create the store using $ngRedux in the AngularJs app, upgrade that instance and share it in the Angular App

2. (cleaner but needs you to refactor the data layer) Create the store in pure redux, inject it in the AngularJs app as an enhancer. Then inject it in your Angular app with `provideStore`

2.1 The baseline is that in order to configure the store we need the initial state and the reducers. But a debate can be had about the action creators. These can also be abstracted, but see 2.2
2.2 Actions creators should take advantage of the framework they live in, so they should be services in AngularJs and services/providers in Angular. That way they can use the fromework http modules, and hook into the digest cycle,
or in the case of Angular, we can use Observables and Selectors to grab the state, as well as keep in line with the native HTTPClientModule


Credit: Boilerplate based on nrwl.io hybrid app [link](https://github.com/nrwl/hybrid-sample)
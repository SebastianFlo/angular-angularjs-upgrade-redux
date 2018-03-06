# Angular Hybrid App Redux State Share

The project assumes you have a AngularJs app already using redux, and want to upgrade it.

There are 2 options you have here:

1. (requires less rewriting of your old app) Create the store using $ngRedux in the AngularJs app, upgrade that instance and share it in the Angular App
2. (cleaner but needs you to refactor the data layer) Create the store in pure redux, inject it in the AngularJs app as an enhancer. Then inject it in your Angular app with `provideStore`

Credit: Boilerplate based on nrwl.io hybrid app [link](https://github.com/nrwl/hybrid-sample)
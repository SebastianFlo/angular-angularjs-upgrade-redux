import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>APP</h1>
    <router-outlet></router-outlet>
    <div ng-view></div>
  `
})
export class AppComponent {
}

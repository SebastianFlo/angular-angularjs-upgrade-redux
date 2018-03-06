import * as angular from 'angular';
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { setAngularLib, UpgradeModule } from '@angular/upgrade/static';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { setUpLocationSync } from '@angular/router/upgrade';

import 'rxjs/add/operator/map';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { angularJsApp } from './angularjs.module';
import { ng1Matcher } from './utils';
import { VanillaAppState } from './redux';
import { ReduxModule } from './angular.redux';

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


@Component({
  selector: 'app-angular-cmp',
  template: `ANGULAR RENDERED {{url | async}}
    <div>
      <a routerLink="/a/ng2">ANGULAR A</a>
      <a routerLink="/b/ng2">ANGULAR B</a>
      <a routerLink="/a/ng1">ANGULARJS A</a>
      <a routerLink="/b/ng1">ANGULARJS B</a>
    </div>
    <div>
      <h3>{{ counter$ | async }}</h3>
      <button (click)="increase()">Increase</button>
      <button (click)="decrease()">Decrease</button>
    </div>
  `
})
export class RoutableAngularComponent {
  @select() readonly counter$: Observable<number>;
  url: Observable<string> = this.route.url.map(p => p.map(s => s.path).join('/'));
  counter: number;

  constructor(private route: ActivatedRoute,
    private ngRedux: NgRedux<VanillaAppState>) {
    // this.counter$.subscribe((data: any) => {
    //   this.counter = data;
    // });
  }

  increase() {
    this.ngRedux.dispatch({ type: 'INCREASE_COUNTER' });
  }

  decrease() {
    this.ngRedux.dispatch({ type: 'DECREASE_COUNTER' });
  }
}

@Component({
  selector: 'app-empty-cmp',
  template: ``
})
export class EmptyComponent {
}

@NgModule({
  declarations: [
    AppComponent,
    RoutableAngularComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    ReduxModule,
    RouterModule.forRoot([
      { path: '', component: RoutableAngularComponent },
      { path: 'a/ng2', component: RoutableAngularComponent },
      { path: 'b/ng2', component: RoutableAngularComponent },
      { matcher: ng1Matcher, component: EmptyComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(upgrade: UpgradeModule) {
    // ignore this bit. Since you aren't using UpgradeModule, this is irrelevant.
    setTimeout(() => {
      setAngularLib(angular);
      upgrade.bootstrap(document.body, [angularJsApp.name]);
      setUpLocationSync(upgrade);
    });
  }
}


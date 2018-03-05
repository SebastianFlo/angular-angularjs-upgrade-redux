import * as angular from 'angular';
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { setAngularLib, UpgradeModule } from '@angular/upgrade/static';
import { ActivatedRoute, RouterModule, UrlSegment } from '@angular/router';
import { setUpLocationSync } from '@angular/router/upgrade';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { angularJsApp } from './angularjs.module';

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
  `
})
export class RoutableAngularComponent {
  url: Observable<string> = this.route.url.map(p => p.map(s => s.path).join('/'));

  constructor(private route: ActivatedRoute) { }
}

@Component({
  selector: 'app-empty-cmp',
  template: ``
})
export class EmptyComponent {
}

export function ng1Matcher(url: UrlSegment[]) {
  if (url.length > 1 && url[1].path === 'ng1') {
    return { consumed: url }; // if we consume everything, the URL will match.
  } else {
    return { consumed: [] }; // if we don't consume anything, the router will keep matching.
  }
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
    RouterModule.forRoot([
      { path: '', component: RoutableAngularComponent },
      { path: 'a/ng2', component: RoutableAngularComponent },
      { path: 'b/ng2', component: RoutableAngularComponent },
      /**
       * Note you can use the '**' instead of a matcher. The '**' route is more forgiving, so everything that
       * works with the matcher, will work with '**' as well.
       *
       * What will be different is that if you have an incorrect URL, that neither AngularJS nor Angular can handle,
       * you will not see any exceptions.
       *
       * If you still want to use the '**' route, you can do a check inside EmptyComponent, something like this:
       *
       * class EmptyComponent {
       *  constructor(route: ActivatedRoute, route: Router) {
       *    route.url.subscribe(url => {
       *      if (// some check about the url goes here) {
       *        console.error('Unknown url');
       *        route.navigateByUrl('/');
       *      }
       *    });
       *  }
       * }
       *
       */
      // {path: '**', component: EmptyComponent}
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


import * as angular from 'angular';
import { Component, NgModule } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { BrowserModule } from '@angular/platform-browser';
import { setUpLocationSync } from '@angular/router/upgrade';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { setAngularLib, UpgradeModule } from '@angular/upgrade/static';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Redux
import { VanillaAppState } from './redux';

// AngularJs
import { angularJsApp } from './angularjs/angularjs.module';

// Angular
import { ng1Matcher } from './angular/utils';
import { ReduxModule } from './angular/angular.redux';
import { AppComponent } from './angular/app.component';
import { RoutableAngularComponent } from './angular/routable.component';
import { EmptyComponent } from './angular/empty.component';
import { ActionsService } from './angular/actions.service';


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
  providers: [ActionsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(upgrade: UpgradeModule) {
    setTimeout(() => {
      setAngularLib(angular);
      upgrade.bootstrap(document.body, [angularJsApp.name]);
      setUpLocationSync(upgrade);
    });
  }
}


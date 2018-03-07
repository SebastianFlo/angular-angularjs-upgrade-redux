import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ActionsService } from './actions.service';

@Component({
  selector: 'app-angular-cmp',
  template: `ANGULAR RENDERED {{url | async}}
    <div>
      <a routerLink='/a/ng2'>ANGULAR A</a>
      <a routerLink='/b/ng2'>ANGULAR B</a>
      <a routerLink='/a/ng1'>ANGULARJS A</a>
      <a routerLink='/b/ng1'>ANGULARJS B</a>
    </div>
    <div>
      <h3>{{ counter$ | async }}</h3>
      <button (click)='increase()'>Increase</button>
      <button (click)='decrease()'>Decrease</button>
    </div>
  `
})
export class RoutableAngularComponent {
  @select() readonly counter$: Observable<number>;
  url: Observable<string> = this.route.url.map(p => p.map(s => s.path).join('/'));
  counter: number;

  constructor(private route: ActivatedRoute,
    private actions: ActionsService) {
    // this.counter$.subscribe((data: any) => {
    //   this.counter = data;
    // });
  }

  increase() {
    // TODO: A general Increase actions service
    this.actions.increase();
  }

  decrease() {
    this.actions.decrease();
  }
}

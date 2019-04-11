import { Component } from '@angular/core';

import { Store } from '../store/store';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    template: `
        <!-- <h1 *ngFor="let bla of auth$ | async">
            {{ bla?.name }}
        </h1>-->
        <div class="wrapper">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {

    auth$ = this.store.select<any>('auth');

    constructor(
        private store: Store
    ) {
        this.store.set('auth', [{id: 1, name: 'Paco'}, {id: 2, name: 'Perico'}]);
        console.log(store);
    }
}

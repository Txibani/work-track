import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'clients',
    styleUrls: ['clients.component.scss'],
    template: `
        <div class="clients">
            <div class="clients__title">
                <h1>
                    <img src="assets/img/dog.jpg">
                    Clients
                </h1>
                <a
                    class="btn__add"
                    routerLink="new">
                    <img src="assets/img/add-white.svg">
                    New client
                </a>
            </div>
            <!--<div *ngIf="meals$ | async as meals; else loading;">
                <div class="message" *ngIf="!meals.length">
                    <img src="src/assets/img/face.svg">
                    No meals, add a new meal to start
                </div>
                <client>
                </client>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="src/assets/img/loading.svg">
                    Fetching meals...
                </div>
            </ng-template>-->
        </div>
    `
})

export class ClientsComponent {
    constructor() {}
}

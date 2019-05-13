import { Component, OnInit, OnDestroy } from '@angular/core';

import { ClientsService, Client } from '../../../shared/services/clients/clients.service';

import { Store } from '../../../../store/store';

import { Observable, Subscription } from 'rxjs';

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
                    class="button btn__add"
                    routerLink="new">
                    <img src="assets/img/add-white.svg">
                    New client
                </a>
            </div>
            <div *ngIf="clients$ | async as clients; else loading;">
                <div class="message" *ngIf="!clients.length">
                    <img src="assets/img/face.svg">
                    No clients, add a new client to start
                </div>
                <item-list
                    *ngFor="let client of clients"
                    [item]="client"
                    (remove)="removeClient($event)"
                ></item-list>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="assets/img/loading.svg">
                    Fetching clients...
                </div>
            </ng-template>
        </div>
    `
})

export class ClientsComponent implements OnInit, OnDestroy {

    clients$: Observable<Client[]>;
    subscription: Subscription;

    constructor(
        private clientsService: ClientsService,
        private store: Store
    ) {}

    removeClient(item) {
       this.clientsService.removeClient(item.$key);
    }

    ngOnInit() {
        this.subscription = this.clientsService.clients$.subscribe();
        this.clients$ = this.store.select<Client[]>('clients');
        console.log(this.clients$);
        console.log(this.subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

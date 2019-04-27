import { Component, OnInit, OnDestroy } from '@angular/core';

import { ClientsService, Client } from '../../../shared/services/clients/clients.service';

import { Store } from '../../../../store/store';

import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'calendar',
    styleUrls: ['calendar.component.scss'],
    template: `
        <div *ngIf="clientsViewing$ | async as clientViewings">
            <calendar-view
                [clientViewings]="clientViewings">
            </calendar-view>
        </div>
    `
})

export class CalendarComponent implements OnInit, OnDestroy {

    clientsViewing$: Observable<Client[]>;
    subscription: Subscription;

    test: any;

    constructor(
        private clientsService: ClientsService,
        private store: Store
    ) {}

    ngOnInit() {
        this.subscription = this.clientsService.clients$.subscribe();
        // TO ONLY SELECT VIEWINGS OR BOOKINGS this.clientsViewing$ = this.clientsService.getViewingClients();
        this.clientsViewing$ = this.store.select<Client[]>('clients');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

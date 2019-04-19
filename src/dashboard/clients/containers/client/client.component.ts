import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientsService, Client } from '../../../shared/services/clients/clients.service';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'client',
    styleUrls: ['client.component.scss'],
    template: `
        <div class="client">
            <div class="client__title">
                <h1>
                    <img src="assets/img/dog.jpg">
                    <span>Dog</span>
                </h1>
            </div>
            <div *ngIf="$client | async as client; else loading">
                <client-form
                    [client]="client"
                    (newClient)="createClient($event)"
                    (deleteClient)="removeClient($event)"
                    (updatedClient)="updateClient($event)">
                </client-form>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="assets/img/loading.svg">
                    Fetching client...
                </div>
            </ng-template>
        </div>
    `
})

export class ClientComponent implements OnInit, OnDestroy {

    $client: Observable<Client>;
    subscription: Subscription;

    constructor(
        private clientsService: ClientsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async createClient(event) {
        await this.clientsService.addClient(event);
        this.router.navigate(['dashboard/clients']);
    }

    async removeClient(event) {
        await this.clientsService.removeClient(event.$key);
        this.router.navigate(['dashboard/clients']);
    }

    async updateClient(payload) {
        console.log(payload);
        await this.clientsService.updateClient(payload.key, payload.data);
        this.router.navigate(['dashboard/clients']);
    }

    ngOnInit() {
        this.subscription = this.clientsService.clients$.subscribe();
        this.$client = this.route.params
            .pipe(
                switchMap(param => this.clientsService.getClient(param.id)));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

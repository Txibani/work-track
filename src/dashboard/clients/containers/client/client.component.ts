import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClientsService } from '../../../shared/services/clients/clients.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client',
    styleUrls: ['client.component.scss'],
    template: `
        <div class="client">
            <div class="client__title">
                <h1>
                    <img src="assets/img/dog.jpg">
                    <span>
                        Dog
                    </span>
                </h1>
            </div>
            <client-form
                (client)="createClient($event)">
            </client-form>
        </div>
    `
})

export class ClientComponent {
    constructor(
        private clientsService: ClientsService,
        private router: Router
    ) {}

    async createClient(event) {
        await this.clientsService.addClient(event);
        // TODO - Redirect to clients page
        this.router.navigate(['']);
    }

}

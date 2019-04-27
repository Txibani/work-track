import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';

@Component ({
    selector: 'app-view',
    styleUrls: ['app-view.component.scss'],
    template: `
        <div class="app-view">
            <ul *ngIf="showClients?.length > 0">
                <li *ngFor="let client of showClients"
                    [ngClass]="{
                        'confirmed': client.type === 'booking',
                        'pending': client.type === 'viewing',
                        'past-viewing': (client.dateViewing && client.dateViewing <= today)
                            || ( client.dateUntil && client.dateUntil <= today)
                    }">
                    <span>{{ client.name }}</span>
                </li>
            </ul>
        </div>

    `
})

export class AppViewComponent implements OnChanges {

    @Input()
    showMonth: number;

    @Input()
    clientViewings: Client[];

    @Input()
    day: any;

    showClients: Client[] = [];

    today = new Date();

    ngOnChanges(changes: SimpleChanges) {
        if (this.showMonth || this.day || this.clientViewings) {
            this.showClients = [];
            this.showPoints(this.clientViewings, this.showMonth, this.day);
        }
    }

    showPoints(clients, month, day) {
        if (clients.length > 0) {
            clients.forEach(client => {
                if (new Date(client.dateViewing).getMonth() === month &&
                    day === new Date(client.dateViewing).getDate()) {
                        this.showClients.push(client);
                    }
            });

        }
    }

}

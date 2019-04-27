import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';

@Component ({
    selector: 'app-view',
    styleUrls: ['app-view.component.scss'],
    template: `
        <div class="app-view">
            <ul *ngIf="showViewingsClients?.length > 0">
                <li *ngFor="let client of showViewingsClients"
                    [ngClass]="{
                        'pending': client.type === 'viewing',
                        'past-viewing': client.dateViewing && client.dateViewing <= today
                    }">
                    <span>{{ client.name }}</span>
                </li>
            </ul>
            <div *ngIf="showBookingClients?.length > 0" class="booking-wrap">
                <div *ngFor="let client of showBookingClients"
                    [ngClass]="{
                        'confirmed': client.type === 'booking'
                    }">
                </div>
            </div>
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

    showViewingsClients: Client[] = [];
    showBookingClients = [];
    today = new Date();

    ngOnChanges(changes: SimpleChanges) {
        if (this.showMonth || this.day || this.clientViewings) {
            this.showViewingsClients = [];
            this.showBookingClients = [];
            this.showPoints(this.clientViewings, this.showMonth, this.day);
        }
    }

    showPoints(clients, month, day) {
        // TODO - REFACTOR sigh....
        if (clients.length > 0) {
            clients.forEach(client => {
                if (client.type === 'viewing' && new Date(client.dateViewing).getMonth() === month &&
                    day === new Date(client.dateViewing).getDate()) {
                    this.showViewingsClients.push(client);
                } else if (client.type === 'booking') {
                    const bookingDays = [];
                    const amountDays = new Date(client.dateUntil - client.dateFrom).getDate();
                    for (let i = 0; i < amountDays; i++) {
                        bookingDays.push({
                            type: 'booking',
                            name: client.name,
                            date: new Date(client.dateFrom).setDate(new Date(client.dateFrom).getDate() + i)
                        });
                    }

                    bookingDays.forEach(booking => {
                        if (new Date(booking.date).getMonth() === month &&
                        day === new Date(booking.date).getDate()) {
                            this.showBookingClients.push(booking);
                        }
                    });

                }
            });
        }
    }

}

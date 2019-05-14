import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';


@Component({
    selector: 'clients-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['clients-view.component.scss'],
    template: `
        <div class="clients-view">
            <div class="clients-view__modal">
                <div class="clients-view__title">
                    <h1>
                        <img src="assets/img/dog.jpg">
                        Clients
                    </h1>
                    <a
                        class="button button--cancel"
                        (click)="closeModal()">
                        x
                    </a>
                </div>

                <div class="clients-view__list">
                    <p *ngIf="clientsData?.length">
                        {{ clientsData[0].date | date }}
                    </p>

                    <span
                        class="schedule-assign__empty"
                        *ngIf="!clientsData?.length">
                        Nothing today
                    </span>
                    <div
                        class="client-view"
                        *ngFor="let item of clientsData">
                            <a routerLink="dashboard/clients/{{item.key}}">
                                {{ item.name }}
                            </a>
                            <span class="client-view__date">
                                Total {{ item.totalDays }} days
                            </span>
                            <span class="client-view__revenue">
                                {{ item.totalDays === 1 ? 12 : item.totalDays * 15 }}
                            </span>
                    </div>
                </div>

            </div>
        </div>
    `
})

export class ClientsViewComponent {

    @Input()
    clientsData: Client[];

    @Output()
    close = new EventEmitter<boolean>();

    closeModal() {
        this.close.emit(false);
    }
}

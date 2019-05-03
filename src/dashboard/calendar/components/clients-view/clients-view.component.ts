import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

import { ClientsService, Client } from '../../../shared/services/clients/clients.service';


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
                        *ngFor="let item of clientsData"
                        (click)="toggleItem(item.name)">
                            <a routerLink="dashboard/clients/{{item.key}}">
                                {{ item.name }}
                            </a>
                            <span class="client-view__date">
                                May 3, 2019 - May 5, 2019
                            </span>
                            <span class="client-view__revenue">
                                25 €
                            </span>
                    </div>
                </div>

                <!--<div class="schedule-assign__submit">
                    <div>
                        <button
                            type="button"
                            class="button"
                            (click)="updateAssign()">
                            Update
                        </button>
                        <button
                            type="button"
                            class="button button--cancel"
                            (click)="cancelAssign()">
                            Cancel
                        </button>
                    </div>
                </div>-->

            </div>
        </div>
    `
})

export class ClientsViewComponent implements OnChanges {

    @Input()
    clientsData: Client[];

    @Output()
    close = new EventEmitter<boolean>();

    ngOnChanges(changes: SimpleChanges) {
        if (this.clientsData.length) {
            console.log('aa', this.clientsData);
        }
    }

    closeModal() {
        this.close.emit(false);
    }
}

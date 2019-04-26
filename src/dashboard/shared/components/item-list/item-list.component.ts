import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../services/clients/clients.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'item-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['item-list.component.scss'],
    template: `
        <div class="list-item">
            <a [routerLink]="getRoute(item)">
                <p class="list-item__name">
                    {{ item.name }}
                    <span class="status"
                        [ngClass]="{
                            'confirmed': item.type === 'booking',
                            'pending': item.type === 'viewing',
                            'past-viewing': (item.dateViewing && item.dateViewing < today)
                                || ( item.dateUntil && item.dateUntil < today)
                        }">
                        <b
                            *ngIf="item.dateViewing">
                            {{ item.dateViewing > today ? 'Pending viewing' : 'Past viewing' }}
                        </b>
                        <b
                            *ngIf="item.dateUntil">
                            {{ item.dateUntil > today ? 'Booking confirmed' : 'Past booking' }}
                        </b>
                    </span>
                </p>
                <p class="list-item__items">
                    <span class="date">
                        <b *ngIf="item.dateViewing">
                            {{ item.dateViewing | date }}
                        </b>
                        <b *ngIf="item.dateUntil">
                            {{ item.dateFrom | date }} - {{ item.dateUntil | date }}
                        </b>
                    </span>
                    <span class="separator">|</span>
                    <span class="comment"> {{ item.comment }}</span>
                </p>
            </a>
            <div
                *ngIf="toggled"
                class="list-item__delete">
                <p>Delete item?</p>
                <button
                    class="confirm"
                    type="button"
                    (click)="deleteItem()">
                    Yes
                </button>
                <button
                    class="cancel"
                    type="button"
                    (click)="toggled = !toggled">
                    No
                </button>
            </div>
            <button
                class="trash"
                type="button"
                (click)="toggled = !toggled">
                <img src="assets/img/remove.svg">
            </button>

        </div>
    `
})

export class ItemListComponent {

    @Input()
    item: any;

    @Output()
    remove = new EventEmitter<Client>();

    toggled = false;

    today = new Date().getTime();

    constructor() {}

    getRoute(item: any) {
        return [item.$key];
    }

    deleteItem() {
        this.remove.emit(this.item);
    }

}

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
                            'confirmed': item.status === 'confirmed',
                            'pending': item.status === 'viewing'
                        }">
                        {{ item.status === 'confirmed' ? 'Booking confirmed' : 'Pending viewing' }}
                    </span>
                </p>
                <p class="list-item__items">
                    <span class="date"> {{ item.dateViewing | date }}</span>
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

    constructor() {}

    getRoute(item: any) {
        return [item.$key];
    }

    deleteItem() {
        this.remove.emit(this.item);
    }

}

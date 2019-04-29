import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'clients-view',
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

                <!--<div class="schedule-assign__list">
                    <span
                        class="schedule-assign__empty"
                        *ngIf="!list?.length">
                        <img src="/img/face.svg">
                        Nothing here to assign
                    </span>
                    <div
                        *ngFor="let item of list"
                        [class.active]="exists(item.name)"
                        (click)="toggleItem(item.name)">
                        {{ item.name }}
                    </div>
                </div>

                <div class="schedule-assign__submit">
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

export class ClientsViewComponent {

    @Output()
    close = new EventEmitter<boolean>();

    closeModal() {
        this.close.emit(false);
    }
}

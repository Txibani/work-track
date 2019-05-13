import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';

@Component({
    selector: 'day-view',
    styleUrls: ['day-view.component.scss'],
    template: `
        <div
            class="day-view"
            *ngFor="let row of rows;"
            [class.active]="dayNum == (this.row *7 + this.col + 1 - getColumn) && showMonth === today">
                <div
                    class="day"
                    *ngIf="
                    (row *7 + col + 1 <= monthLength + getColumn) &&
                    showCorrect(row, col)">
                    {{ this.row *7 + this.col + 1 - getColumn }}
                </div>
                <div *ngIf="clientViewings.length > 0" class="wrap">
                    <app-view
                        [day]="this.row *7 + this.col + 1 - getColumn"
                        [showMonth]="showMonth"
                        [clientViewings]="clientViewings"
                        (selectedDay)="getSelectedDayData($event)"></app-view>
                </div>
        </div>
    `
})

export class DayViewComponent {

    @Input()
    col: number;

    @Input()
    dayNum: number; // current day

    @Input()
    monthLength: number;

    @Input()
    getColumn: number;

    @Input()
    showMonth: number;

    @Input()
    clientViewings: Client[];

    @Output()
    selectedDay = new EventEmitter<any>();

    show = true;

    rows = Array.from(Array(6).keys()); // [0, 1, 2, 3, 4, 5, 6]

    today = new Date().getMonth();

    showCorrect(row, col) {
        if (row === 0) {
        console.log('row', row);
        console.log('col', col);
        console.log('this.getColumn', this.getColumn);
        console.log('col < this.getColumn', col < this.getColumn);
        }

        return (
            (row === 0 && col < this.getColumn) ? false : true
        );
    }

    getSelectedDayData(event) {
        this.selectedDay.emit(event);
    }

}

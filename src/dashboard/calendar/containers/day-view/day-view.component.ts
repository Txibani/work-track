import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'day-view',
    styleUrls: ['day-view.component.scss'],
    template: `
        <div
            class="day-view"
            *ngFor="let row of rows;"
            [class.active]="dayNum == (row *7 + col + 1) && showMonth === today">
                <div
                    *ngIf="
                    (row *7 + col + 1 <= monthLength + getColumn) &&
                    showCorrect(row, col)">
                    {{ this.row *7 + this.col + 1 - getColumn }}
                </div>
        </div>
    `
})

export class DayViewComponent implements OnChanges {

    @Input()
    col: number;

    @Input()
    nowsCol: number;

    @Input()
    dayNum: number;

    @Input()
    monthLength: number;

    @Input()
    getColumn: number;

    @Input()
    showMonth: number;

    show = true;

    rows = Array.from(Array(5).keys()); // [0, 1, 2, 3, 4, 5]

    today = new Date().getMonth();

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
    }

    showCorrect(row, col) {
        return (
            (row === 0 && col < this.getColumn) ? false : true
        );
    }
}

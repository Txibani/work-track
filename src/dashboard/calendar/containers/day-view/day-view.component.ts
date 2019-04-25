import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'day-view',
    styleUrls: ['day-view.component.scss'],
    template: `
        <div
            class="day-view"
            *ngFor="let row of rows; index as i"
            [class.active]="dayNum == (this.row *7 + this.col + 1)">
            <!--row {{ this.row }} / col {{ this.col }}-->
                <div
                    *ngIf="(this.row *7 + this.col + 1) <= monthLength">
                    {{ this.row *7 + this.col + 1 }}
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

    rows = Array.from(Array(5).keys()); // [0, 1, 2, 3, 4, 5]

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.monthLength) {
            console.log('monthLength', this.dayNum);
            // console.log('col', this.col);
        }
    }
}

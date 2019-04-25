import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'calendar',
    styleUrls: ['calendar.component.scss'],
    template: `
        <div class="calendar">
            <div class="calendar-head">
                <button
                    class="button"
                    (click)="viewMonth('prev')"><</button>
                <p class="main">{{ now | date: 'MMMM yyyy' }}</p>
                <button
                    class="button"
                    (click)="viewMonth('next')">></button>
            </div>
            <month-view
                [now]="now"
                [monthLength]="monthLength"></month-view>
        </div>
    `
})

export class CalendarComponent implements OnInit {

    now: any;

    monthLength = 1;

    constructor() {}

    ngOnInit() {
        this.now = new Date();
        this.getMonthLength(this.now.getMonth());
    }

    getMonthLength(month: any) {
        const longMonths = [0, 2, 4, 6, 7, 9, 11];
        const shortMonths = [3, 5, 8, 10];

        if (shortMonths.includes(month)) {
            this.monthLength = 30;
        } else if (longMonths.includes(month)) {
            this.monthLength = 31;
        } else {
            this.monthLength = 28;
        }
    }

    viewMonth(flag: string) {
        if (this.monthLength === 30 && this.now.getMonth() !== 0) {
            this.monthLength = 31;
        } else if (this.monthLength === 31 && this.now.getMonth() !== 0) {
            this.monthLength = 30;
        }
        const flagMove = flag === 'next' ? 1 : -1;
        this.now = new Date(this.now.setMonth(this.now.getMonth() + flagMove));
    }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'calendar-view',
    styleUrls: ['calendar-view.component.scss'],
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
                [monthLength]="monthLength"
                [showMonth]="showMonth"
                [getColumn]="getColumn"
                [clientViewings]="clientViewings"
                (selectedUserDay)="selectedDayByUser($event)">
            </month-view>
        </div>
    `
})

export class CalendarViewComponent implements OnInit {

    @Input()
    clientViewings: Client[];

    @Output()
    selectedDay = new EventEmitter<any>();

    now: any;

    monthLength = 1;

    column = [0, 1, 2, 3, 4, 5, 6];

    getColumn: number;
    todaysMonth: any;
    showMonth: number;

    clients: any;

    constructor() {}

    ngOnInit() {
        this.now = new Date();
        this.getMonthLength(this.now.getMonth());
        this.todaysMonth = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
        this.getColumn = this.todaysMonth.getDay();
        this.showMonth = this.now.getMonth();
    }

    selectedDayByUser(event) {
        this.selectedDay.emit(event);
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

        const nextMonth = new Date(this.now.getFullYear(), this.now.getMonth() + flagMove, 1);
        this.getColumn = nextMonth.getDay();

        this.now = new Date(this.now.setMonth(this.now.getMonth() + flagMove));
        this.showMonth = this.now.getMonth();

    }

}

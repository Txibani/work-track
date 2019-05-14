import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';

@Component({
    selector: 'month-view',
    styleUrls: ['month-view.component.scss'],
    template: `
        <div class="mont-view">
            <div class="mont-view__week">
                <div class="view" *ngFor="let day of weekDays; index as i">
                    <div class="view-head">
                        <span class="show-for-large">{{ day.large }}</span>
                        <span class="show-for-small">{{ day.short }}</span>
                    </div>
                    <day-view
                        [col]="i"
                        [monthLength]="monthLength"
                        [dayNum]="now | date: 'd'"
                        [getColumn]="getColumn - 1"
                        [showMonth]="showMonth"
                        [clientViewings]="clientViewings"
                        (selectedDay)="selectedDay($event)">
                    </day-view>
                </div>
            </div>
        </div>
    `
})

export class MonthViewComponent {

    @Input()
    now: Date;

    @Input()
    monthLength: number;

    @Input()
    getColumn: number;

    @Input()
    showMonth: number;

    @Input()
    clientViewings: Client[];

    @Output()
    selectedUserDay = new EventEmitter<any>();

    weekDays = [
        {large: 'Monday', short: 'M'},
        {large: 'Tuesday', short: 'T'},
        {large: 'Wednesday', short: 'W'},
        {large: 'Thursday', short: 'T'},
        {large: 'Friday', short: 'F'},
        {large: 'Saturday', short: 'S'},
        {large: 'Sunday', short: 'S'}
    ];

    showFirstDay = true;

    selectedDay(event) {
        this.selectedUserDay.emit(event);
    }

}

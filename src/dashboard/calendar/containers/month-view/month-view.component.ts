import { Component, Input } from '@angular/core';

import { Client } from '../../../shared/services/clients/clients.service';

@Component({
    selector: 'month-view',
    styleUrls: ['month-view.component.scss'],
    template: `
        <div class="mont-view">
            <div class="mont-view__week">
                <div class="view" *ngFor="let day of weekDays; index as i">
                    <div class="view-head">
                        {{ day }}
                    </div>
                    <day-view
                        [col]="i"
                        [monthLength]="monthLength"
                        [dayNum]="now | date: 'd'"
                        [getColumn]="getColumn - 1"
                        [showMonth]="showMonth"
                        [clientViewings]="clientViewings">
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

    weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    showFirstDay = true;

}

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ClientsService, Client } from '../../../shared/services/clients/clients.service';

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

export class MonthViewComponent implements OnInit, OnChanges {

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

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnInit() {
    }
}

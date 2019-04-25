import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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
                        [nowsCol]="now | date: 'W'"
                        [dayNum]="now | date: 'd'">
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

    weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.now) {
            console.log('noww', this.now);
        }
    }

    ngOnInit() {
    }
}

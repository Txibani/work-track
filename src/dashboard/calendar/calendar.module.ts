import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { CalendarComponent } from './containers/calendar/calendar.component';
import { MonthViewComponent } from './containers/month-view/month-view.component';
import { DayViewComponent } from './containers/day-view/day-view.component';

export const ROUTES: Routes = [
    { path: '', component: CalendarComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        CalendarComponent,
        MonthViewComponent,
        DayViewComponent
    ]
})
export class CalendarModule {}

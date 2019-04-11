import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { CalendarComponent } from './containers/calendar/calendar.component';

export const ROUTES: Routes = [
    {
        path: 'calendar',
        component: CalendarComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        CalendarComponent
    ]
})
export class CalendarModule {}

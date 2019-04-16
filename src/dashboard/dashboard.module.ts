import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth.guard';

// shared module
import { SharedModule } from './shared/shared.module';

// routes - dictates the actual routes
export const ROUTES: Routes = [{
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'calendar'
        },
        {
            path: 'calendar',
            loadChildren: './calendar/calendar.module#CalendarModule' // this will lazy load by default
        },
        {
            path: 'clients',
            loadChildren: './clients/clients.module#ClientsModule' // this will lazy load by default
        },
        {
            path: 'revenue',
            loadChildren: './revenue/revenue.module#RevenueModule' // this will lazy load by default
        }
    ]
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule,
    ]
})
export class DashboardModule {}

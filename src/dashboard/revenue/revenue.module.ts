import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { RevenueComponent } from './containers/revenue/revenue.component';

export const ROUTES: Routes = [
    {
        path: 'revenue',
        component: RevenueComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        RevenueComponent
    ]
})
export class RevenueModule {}

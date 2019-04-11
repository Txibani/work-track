import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { ClientsComponent } from './containers/clients/clients.component';

export const ROUTES: Routes = [
    {
        path: 'clients',
        component: ClientsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        ClientsComponent
    ]
})
export class ClientsModule {}

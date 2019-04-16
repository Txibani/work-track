import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatIconModule,
    MatFormFieldModule, MatInputModule } from '@angular/material';

// shared module
import { SharedModule } from '../shared/shared.module';

// containers
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientComponent } from './containers/client/client.component';

// components
import { ClientFormComponent } from './components/client-form/client-form.component';

export const ROUTES: Routes = [
    { path: '', component: ClientsComponent },
    { path: 'add', component: ClientComponent },
    { path: ':id', component: ClientComponent },
    // { path: ':id', component: ClientComponent },
    // { path: ':id/edit', component: ClientsComponent },
];



// 1. View list of clients  => /dashboard/clients
// 2. Add new client => /dashboard/clients/add
// 3. View specific client & delete => /dashboard/clients/id/1
// 4. Edit existing client => /dashboard/clients/id/1/edit


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        ClientsComponent,
        ClientComponent,
        ClientFormComponent
    ]
})
export class ClientsModule {}

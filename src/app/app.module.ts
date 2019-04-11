import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Store } from '../store/store';

// feature modules
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';

// containers
import { AppComponent } from './app.component';

// components

// routes
export const ROUTES: Routes = [];


@NgModule({
    imports: [
        BrowserModule,
        AuthModule,
        DashboardModule,
        RouterModule.forRoot(ROUTES)
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        Store
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

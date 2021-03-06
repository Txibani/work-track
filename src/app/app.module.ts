import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Store } from '../store/store';

// feature modules
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// routes
export const ROUTES: Routes = [];


@NgModule({
    imports: [
        BrowserModule,
        AuthModule,
        DashboardModule,
        RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppNavComponent
    ],
    providers: [
        Store
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

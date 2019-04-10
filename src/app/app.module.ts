import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Store } from '../store/store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './app.component';

// components


@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        Store
    ],
    imports: [
        BrowserModule,
        AuthModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


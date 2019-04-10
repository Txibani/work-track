import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { Store } from '../store/store';

// containers
import { LoginComponent } from './login/container/login/login.component';
import { RegisterComponent } from './register/container/register/register.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        Store
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// shared modules
import { SharedModule } from './shared/shared.module';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Firebase config


// routes - dictates the actual routes
export const ROUTES: Routes = [{
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
        },
        {
            path: 'login',
            loadChildren: './login/login.module#LoginModule' // this will lazy load by default
        },
        {
            path: 'register',
            loadChildren: './register/register.module#RegisterModule' // this will lazy load by default
        }
    ]
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule
    ]
})
export class AuthModule {}

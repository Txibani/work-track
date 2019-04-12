import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'login',
    template: `
        <div>
            <auth-form
                (credentials)="loginEvent($event)">
                <h1>Login</h1>
                <p class="error" *ngIf="error">
                    {{ error?.message }}
                </p>
                <button>Sign in</button>
                <a routerLink="/register">Don't have an account? Register</a>
            </auth-form>
        </div>
    `
})

export class LoginComponent {

    error: {};

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    loginEvent(event: any): void {
        this.authService.loginUser(event.email, event.password)
            .then(result => this.router.navigate(['dashboard']))
            .catch(error => this.error = error);
    }
}

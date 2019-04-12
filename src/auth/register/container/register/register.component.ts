import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'register',
    template: `
        <div>
            <auth-form
                (credentials)="registerEvent($event)">
                <h1>Register</h1>
                <p class="error" *ngIf="error">
                    {{ error?.message }}
                </p>
                <button>Register</button>
                <a routerLink="/login">Already registered? Sign in</a>
            </auth-form>
        </div>
    `
})

export class RegisterComponent {

    error: {};

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    registerEvent(event: any): void {
        this.authService.createUser(event.email, event.password)
            .then(result => this.router.navigate(['dashboard']))
            .catch(error => this.error = error);
    }
}

import { Component } from '@angular/core';
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
        private authService: AuthService
    ) {}

    registerEvent(event: any): void {
        console.log(event);
        this.authService.createUser(event.email, event.password)
            .then(result => console.log('wwhatt', result))
            .catch(error => this.error = error);
    }
}

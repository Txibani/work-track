import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'auth-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['auth-form.component.scss'],
    template: `
        <div class="auth-form">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">

                <ng-content select="h1"></ng-content>

                <label>
                    <input
                        type="email"
                        formControlName="email"
                        placeholder="Email"
                        name="email"
                        email>
                </label>

                <label>
                    <input
                        type="text"
                        formControlName="password"
                        placeholder="Password"
                        name="password">
                </label>

                <ng-content select=".error"></ng-content>

                <ng-content select="button"></ng-content>

                <ng-content select="a"></ng-content>

            </form>
        </div>
    `
})

export class AuthFormComponent {

    @Output()
    credentials = new EventEmitter<{email: string, password: string}>();

    form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder
    ) {}

    onSubmit() {
        if (this.form.valid) {
            this.credentials.emit(this.form.value);
        }
    }
}

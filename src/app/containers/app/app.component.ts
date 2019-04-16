import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '../../../store/store';

import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';

import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    template: `
        <div *ngIf="(user$ | async)?.authenticated"
            class="header">
            <app-header
                (logout)="logoutUser($event)">
            </app-header>
            <app-nav>
            </app-nav>
        </div>
        <div class="content">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent implements OnInit, OnDestroy {

    user$: Observable<User>;
    subscription: Subscription;

    constructor(
        private store: Store,
        private authService: AuthService,
        private router: Router
    ) {}

    async logoutUser(event: boolean) {
        await this.authService.logoutUser();
        this.router.navigate(['/']);
    }

    ngOnInit() {
        this.subscription = this.authService.auth$.subscribe();
        this.user$ = this.store.select<User>('user');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

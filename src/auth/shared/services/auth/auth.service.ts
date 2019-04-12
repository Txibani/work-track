import { Injectable } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '../../../../store/store';

import { tap } from 'rxjs/operators';

export interface User {
    email: string;
    uid: string;
    authenticated: boolean;
}

@Injectable({
    providedIn: 'root'   // this provides service in root module if 'root' selected, or any selected module
})
export class AuthService {

    auth$ = this.angularFire.authState
        .pipe(
            tap(next => {
                if (!next) {
                    this.store.set('user', null);
                    return;
                }
                const user: User = {
                    email: next.email,
                    uid: next.uid,
                    authenticated: true
                };
                this.store.set('user', user);
            })
        );

    constructor(
        private angularFire: AngularFireAuth,
        private store: Store
    ) {}

    get user() {
        return this.angularFire.auth.currentUser;
    }

    get authState() {
        return this.angularFire.authState;
    }

    createUser(email: string, password: string) {
        // update store
        return this.angularFire.auth
            .createUserWithEmailAndPassword(email, password);
    }

    loginUser(email: string, password: string) {
        return this.angularFire.auth
            .signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return this.angularFire.auth.signOut();
    }
}

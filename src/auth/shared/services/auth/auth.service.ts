import { Injectable } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'   // this provides service in root module if 'root' selected, or any selected module
})
export class AuthService {
    constructor(
        private angularFire: AngularFireAuth
    ) {}

    get user() {
        return this.angularFire.auth.currentUser;
    }

    get authState() {
        return this.angularFire.authState;
    }

    createUser(email: string, password: string) {
        return this.angularFire.auth
            .createUserWithEmailAndPassword(email, password);
    }

    loginUser(email: string, password: string) {
        return this.angularFire.auth
            .signInWithEmailAndPassword(email, password);
    }
}

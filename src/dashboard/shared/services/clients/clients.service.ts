import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

@Injectable({
    providedIn: 'root'   // this provides service in root module if 'root' selected, or any selected module
})
export class ClientsService {

    constructor(
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    get uid() {
        return this.authService.user.uid;
    }

    addClient(client: any) {
        return this.db.list(`/clients/${this.uid}`).push(client);
    }
}

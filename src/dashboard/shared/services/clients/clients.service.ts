import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from '../../../../store/store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

export interface Client {
    name: string;
    status: string;
    dateFrom: Date | null;
    dateUntil: Date | null;
    dateViewing: Date | null;
    comment: string;
    timestamp: number;
    $key: string;
    $exists: () => boolean;
}

@Injectable({
    providedIn: 'root'   // this provides service in root module if 'root' selected, or any selected module
})
export class ClientsService {

    clients$: Observable<any> = this.db.list(`clients/${this.uid}`)
        .snapshotChanges() // https://github.com/angular/angularfire2/blob/master/docs/firestore/documents.md
        .pipe(
            map(changes => {
                return changes.map(change =>
                    ({ $key: change.payload.key, ...change.payload.val() })
                );
            }),
            tap(next => this.store.set('clients', next))
        );

    constructor(
        private db: AngularFireDatabase,
        private authService: AuthService,
        private store: Store
    ) {}

    get uid() {
        return this.authService.user.uid;
    }

    addClient(client: Client) {
        return this.db.list(`/clients/${this.uid}`).push(client);
    }

    removeClient(key: string) {
        return this.db.list(`/clients/${this.uid}`).remove(key);
    }

    getClient(key: string) {
        if (!key || key === 'new') {
            return of({});  // emits an empty observable
        }
        return this.store.select<Client[]>('clients')
            .pipe(
                filter(Boolean),
                map(clients => clients.find((client: Client) => client.$key === key))
            );
    }

    updateClient(key: string, client: Client) {
        return this.db.object(`/clients/${this.uid}/${key}`).update(client);
    }

}

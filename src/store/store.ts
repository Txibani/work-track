import { distinctUntilChanged, pluck, } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

// import { State } from './state/state';

import { User } from '../auth/shared/services/auth/auth.service';
import { Client } from '../dashboard/shared/services/clients/clients.service';

// set method to allow to set items into our store - store.set('todos', [{},{}])
// select to get data back from store - store.select('todos')

export interface State {
    user: User;
    clients: Client[];
    [key: string]: any;
}

const state: State = {
    user: undefined,
    clients: undefined
};


export class Store {

    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());
    // will only get call once if we update our store with the same value multiple times.

    // get value from our store
    get value() {
        return this.subject.value;
    }

    // select method to access store
    select<T>(name: string): Observable<T> {
        return this.store.pipe(pluck(name));
        // pluck will return an observable based on the name property
        // will fetch just the property we're asking for
    }

    // set method that will allow us to set items to our store
    set(name: string, prevState: any) {
        this.subject.next({
            ...this.value,
            [name]: prevState
        });
    }

}

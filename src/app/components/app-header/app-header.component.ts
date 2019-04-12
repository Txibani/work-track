import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../../auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-header',
    styleUrls: ['app-header.component.scss'],
    template: `
        App header
        <button (click)="logoutUser()">Logout</button>
    `
})

export class AppHeaderComponent {

    @Output()
    logout: EventEmitter<boolean> = new EventEmitter<boolean>();

    logoutUser() {
        this.logout.emit(true);
    }
}

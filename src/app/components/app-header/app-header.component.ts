import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-header.component.scss'],
    template: `
        <div class="app-header">
            <p class="title">Work track App</p>
            <button class="button" (click)="logoutUser()">Logout</button>
        </div>
    `
})

export class AppHeaderComponent {

    @Output()
    logout: EventEmitter<boolean> = new EventEmitter<boolean>();

    logoutUser() {
        this.logout.emit(true);
    }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-nav.component.scss'],
    template: `
        <div class="app-nav">
            <a routerLink="dashboard/calendar"
                routerLinkActive="active">
                Calendar
            </a>
            <a routerLink="dashboard/clients"
                routerLinkActive="active">
                Clients
            </a>
            <a routerLink="dashboard/revenue"
                routerLinkActive="active">
                Revenue
            </a>
        </div>
    `
})

export class AppNavComponent {

}

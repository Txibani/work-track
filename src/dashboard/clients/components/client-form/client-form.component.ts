import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Client } from '../../../shared/services/clients/clients.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['client-form.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
    template: `
        <div class="client-form">
            <form [formGroup]="form">

                <label>
                    <input
                        type="text"
                        placeholder="Dog name"
                        formControlName="name">
                        <div class="error" *ngIf="requiredName()">
                            Dog name is required
                        </div>
                </label>

                <label>
                    <div class="select">
                        <select
                            formControlName="type">
                            <option value="" selected="true">Choose an option</option>
                            <option value="viewing">Viewing</option>
                            <option value="booking">Booking</option>
                        </select>
                        <div class="error" *ngIf="requiredType()">
                            Viewing type is required
                        </div>
                    </div>
                </label>

                <div *ngIf="form.value['type'] !== ''">
                    <div class="dates" *ngIf="form.value['type'] === 'booking'; else viewing">
                        <label>
                            <input
                                matInput
                                [matDatepicker]="picker"
                                placeholder="From"
                                formControlName="dateFrom">
                            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                        </label>

                        <label>
                            <input
                                matInput
                                [matDatepicker]="pickerTo"
                                placeholder="Until"
                                formControlName="dateUntil">
                            <mat-datepicker-toggle matSuffix [for]="pickerTo"></mat-datepicker-toggle>
                            <mat-datepicker #pickerTo></mat-datepicker>
                        </label>
                    </div>

                    <ng-template #viewing>
                        <label>
                            <input
                                matInput
                                [matDatepicker]="pickerViewing"
                                placeholder="Date"
                                formControlName="dateViewing">
                            <mat-datepicker-toggle matSuffix [for]="pickerViewing"></mat-datepicker-toggle>
                            <mat-datepicker #pickerViewing></mat-datepicker>
                        </label>
                    </ng-template>
                </div>

                <label>
                    <textarea
                        placeholder="Comment here..."
                        formControlName="comment"></textarea>
                </label>


                <div class="client-form__submit">
                    <div>
                        <button
                            type="button"
                            class="button"
                            *ngIf="!exists"
                            (click)="createClient()">
                            Create client
                        </button>
                        <button
                            type="button"
                            class="button"
                            *ngIf="exists"
                            (click)="updateClient()">
                            Save
                        </button>
                        <a
                            class="button button--cancel"
                            [routerLink]="['../']">
                            Cancel
                        </a>
                    </div>

                    <div class="client-form__delete" *ngIf="exists">
                        <div *ngIf="toggled">
                            <p>Delete item?</p>
                            <button
                                class="confirm"
                                type="button"
                                (click)="removeClient()">
                                Yes
                            </button>
                            <button
                                class="cancel"
                                type="button"
                                (click)="toggled = !toggled">
                                No
                            </button>
                        </div>

                        <button
                            class="button button--delete"
                            type="button"
                            (click)="toggled = !toggled">
                            Delete
                        </button>
                    </div>

                </div>

            </form>
        </div>
    `
})

export class ClientFormComponent implements OnChanges {

    @Input()
    client: Client;

    @Output()
    newClient = new EventEmitter<any>();

    @Output()
    deleteClient = new EventEmitter<any>();

    @Output()
    updatedClient = new EventEmitter<any>();

    exists = false;
    toggled = false;

    form = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        dateFrom: [''],
        dateUntil: [''],
        dateViewing: [''],
        comment: ['']
    });

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.client.name) {
            this.exists = true;
            const value = this.client;

            if (this.client.dateViewing) {
                value.dateViewing = new Date(this.client.dateViewing);
            } else {
                value.dateFrom = new Date(this.client.dateFrom);
                value.dateUntil = new Date(this.client.dateUntil);
            }

            this.form.patchValue(value);
        }
    }

    requiredName() {
        return (
            this.form.get('name').hasError('required')
            && this.form.get('name').touched
        );
    }

    requiredType() {
        return (
             this.form.get('type').hasError('required')
            && this.form.get('type').touched
        );
    }

    updateClient() {
        this.updateDateValue();
        this.updatedClient.emit({key: this.client.$key, data: this.form.value});
    }

    removeClient() {
        this.deleteClient.emit(this.client);
    }

    createClient() {
        if (this.form.valid) {
            this.updateDateValue();
            this.newClient.emit(this.form.value);
        }
    }

    updateDateValue() {
        // TODO - Breaks when date updated
        const controlTime = ['dateViewing', 'dateFrom', 'dateUntil'];

        controlTime.forEach(control => {
            if (this.form.controls[control].touched && this.form.controls[control].value._d) {
                const time = this.form.controls[control].value._d.getTime();
                this.form.controls[control].setValue(time);
            }
        });

        if (this.form.value.type === 'booking') {
            this.form.controls.dateViewing.setValue('');

        } else {
            this.form.controls.dateFrom.setValue('');
            this.form.controls.dateUntil.setValue('');
        }
    }

}

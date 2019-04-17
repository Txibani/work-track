import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['client-form.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fr' },
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
                </label>

                <label>
                    <div class="select">
                        <select
                            formControlName="status">
                            <option value="" selected="true">Choose an option</option>
                            <option value="viewing">Viewing</option>
                            <option value="confirmed">Confirmation</option>
                        </select>
                    </div>
                </label>

                <div *ngIf="form.value['status'] !== ''">
                    <div class="dates" *ngIf="form.value['status'] === 'confirmed'; else viewing">
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


                <div class="meal-form__submit">
                    <div>
                        <button
                            type="button"
                            class="button"
                            (click)="createClient()">
                            Create client
                        </button>
                        <!--<button
                            type="button"
                            class="button"
                            *ngIf="exists"
                            (click)="updateMeal()">
                            Save
                        </button>-->
                        <a
                            class="button button--cancel"
                            [routerLink]="['../']">
                            Cancel
                        </a>
                    </div>

                    <!-- <div class="meal-form__delete" *ngIf="exists">
                        <div *ngIf="toggled">
                            <p>Delete item?</p>
                            <button
                                class="confirm"
                                type="button"
                                (click)="removeMeal()">
                                Yes
                            </button>
                            <button
                                class="cancel"
                                type="button"
                                (click)="toggle()">
                                No
                            </button>
                        </div>

                        <button
                            class="button button--delete"
                            type="button"
                            (click)="toggle()">
                            Delete
                        </button>
                    </div>-->

                </div>

            </form>
        </div>
    `
})

export class ClientFormComponent {

    @Output()
    client = new EventEmitter<any>();

    form = this.fb.group({
        name: [''],
        dateFrom: [''],
        dateUntil: [''],
        dateViewing: [''],
        status: [''],
        comment: ['']
    });


    constructor(
        private fb: FormBuilder
    ) {}

    createClient() {
        if (this.form.valid) {
            // TODO - This needs to be a loop so it'll be apply to all dates
            const time = this.form.controls.dateViewing.value._d.getTime();
            this.form.controls.dateViewing.setValue(time);
            this.client.emit(this.form.value);
        }
    }

}

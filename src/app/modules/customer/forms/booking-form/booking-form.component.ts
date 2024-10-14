import {Component, Input, LOCALE_ID, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {DatePipe, NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {DateTime} from "luxon";
import {FormDTO} from 'app/core/restaurant_service';
import {MatCardModule} from "@angular/material/card";
import {LanguagesComponent} from "../../../../layout/common/languages/languages.component";
import {TranslocoModule} from "@ngneat/transloco";
import {RedirectFormComponent} from "../redirect-form/redirect-form.component";
import {MatDividerModule} from "@angular/material/divider";
import {debounceTime, distinctUntilChanged, filter} from "rxjs";
import {BookingStatus} from "./booking_status";
import {DateformatitaPipe} from "../../../pages/components/pipe/dateformatita.pipe";

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    imports: [
        TranslocoModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        NgIf,
        ReactiveFormsModule,
        NgClass,
        MatCardModule,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        DatePipe,
        DateformatitaPipe,
        LanguagesComponent,
        FormsModule,
        RedirectFormComponent,
        MatDividerModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'it' }],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class BookingFormComponent implements OnInit {

    @Input() formDTO : FormDTO;

    currentState = BookingStatus.CALENDAR;

    bookingForm: UntypedFormGroup;

    ngOnInit(): void {
        this.bookingForm = this._formBuilder.group({
            customerId: [null], // Assuming no validation for ID
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.minLength(10), Validators.pattern(/^\d{8,}$/)]],
            prefix: ['39', [Validators.required]],
            birthDate: [null],
            presenceCount: [null],
            origin: [this.formDTO.formCode],
            lastPresence: [null],
            flames: [null],
            address: [''],
            city: [''],
            province: [''],
            postalCode: ['', [Validators.required]],
            country: [''],
            privacyConsent: [false, Validators.requiredTrue],
            marketingConsent: [false],
            profilingConsent: [false],
            emailSpamOptOut: [false],
            tags: [''],
            notes: [''],
            registrationDate: [null]
        });

        this.bookingForm.get('phone').valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                filter(value => value.length >= 8),
                filter(value => this.bookingForm.get('phone').valid)
            )
            .subscribe(() => {
                this.onPhoneBlur();
            });
    }

    constructor(private _formBuilder: FormBuilder,) {
    }

    protected readonly FormDTO = FormDTO;

    dateSelected : DateTime = DateTime.now();

    loadingData: boolean = false;

    guestCounter: number = 2;

    changeState(state: BookingStatus) {
        this.currentState = state;
    }

    setSelectedDate(event: DateTime) {
        this.dateSelected = event;
        this.changeState(BookingStatus.HOUR);
        console.log('Selected Date:', this.dateSelected);
    }

    addGuest(number: number) {
        this.guestCounter = this.guestCounter + number;
    }

    saveCustomerAndOpenNewTab(redirectPage: string) {

    }

    private onPhoneBlur() {

    }

    protected readonly BookingStatus = BookingStatus;
}

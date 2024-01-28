import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DatePipe, NgClass, NgForOf, NgIf, registerLocaleData} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {BookingControllerService, CustomerFormData} from "../../../core/booking";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FuseAlertComponent, FuseAlertType} from "../../../../@fuse/components/alert";
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@Component({
    selector: 'booking',
    templateUrl: './booking.component.html',
    styleUrls: ['booking.component.css'],
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatButtonToggleModule,
        NgClass,
        NgForOf,
        NgIf,
        MatDatepickerModule,
        MatCardModule,
        DatePipe,
        MatChipsModule,
        RouterLink,
        MatCheckboxModule,
        FuseAlertComponent,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }
    ],
    standalone: true
})
export class BookingComponent implements OnInit{

    branchCode: string;
    formCode: string;
    formFieldHelpers: string[] = [''];
    reservationForm: UntypedFormGroup;
    numbers$ = Array.from({ length: 24 }, (_, index) => index + 1);
    selectedNumber: any;

    currentDate: Date;

    customerFormData : CustomerFormData;


    ngOnInit(): void {

        this.signUpForm = this.fb.group({
                name      : ['', Validators.required],
                lastname      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                phone  : ['', Validators.required],
                agreements: ['', Validators.requiredTrue],
            },
        );

        this.route.queryParams.subscribe((params) => {
            this.branchCode = params['branchCode'];
            this.formCode = params['form'];
            console.log('Branch Code from URL: ' +  this.branchCode + ' - form code: ' + this.formCode );

            this._bookingService.retrieveFormData(this.branchCode, this.formCode)
                .subscribe((customerFormData: CustomerFormData)=>{
                this.customerFormData = customerFormData;
                console.log(this.customerFormData);
            });
        });
    }

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private _bookingService: BookingControllerService) {



        this.reservationForm = this.fb.group({
            phone: ['', Validators.required],
            phonePrefix: ['', Validators.required],
        });

        this.reservationForm.get('phone').valueChanges.subscribe((value: string) => {
            if (value.length === 10) {
                console.log('trigger e method', value);
            }
        });


    }

    unlock() {
    }

    selectNumber(number: any) {
        this.selectedNumber = number;
    }

    selectedToggle: string = "date";
    selectedDate: Date = null;
    signUpForm: any;
    showAlert: any;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    selectToggle(value: string): void {
        this.selectedToggle = value;
    }

    onSelect(event){
        this.selectedDate = event;
        this.selectedToggle = 'pax';
    }

    transform(value: any, format: string = 'yyyy-MM-dd'): any {

        if (value) {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(value, format);
        }
        return null;
    }

    signUp() {

    }
}

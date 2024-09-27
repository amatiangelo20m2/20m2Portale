import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FuseAlertComponent, FuseAlertType} from "../../../../@fuse/components/alert";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, MatOptionModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {NgClass, NgForOf, NgIf, registerLocaleData} from "@angular/common";
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import Swal from "sweetalert2";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DateTime} from "luxon";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt);

@Component({
    selector: 'tablehunter',
    templateUrl: './tablehunter.component.html',
    providers: [
        { provide: LOCALE_ID, useValue: 'it-IT' },
        { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }
    ],
    imports: [
        FuseAlertComponent,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        NgIf,
        ReactiveFormsModule,
        MatTabsModule,
        NgForOf,
        MatTooltipModule,
        NgClass,
        RouterLink,
        MatRadioModule,
        MatStepperModule
    ],
    standalone: true
})
export class TablehunterComponent implements OnInit{
    formCode: any;

    showAlert: boolean = false;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };

    formFieldHelpers: string[] = [''];
    registerCustomerForm: FormGroup;
    formReservationDetails: UntypedFormGroup;


    ngOnInit(): void {

        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                country: ['', Validators.required],
                language: ['', Validators.required],

            }),
            step2: this._formBuilder.group({
                mobilePhone      : ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10,}$/)]],
                selectedCountry      : ['39', Validators.required],
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                cap: ['', Validators.required],

            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
        this.formReservationDetails = this._formBuilder.group({
            dogsAllowed     : ['0'],
            particularRequest  : ['']
        });

        this.registerCustomerForm = this._formBuilder.group({
                name      : ['', Validators.required],
                lastname  : ['', Validators.required],
                email  : ['', Validators.required],
                dob  : ['', Validators.required],
                agreements: ['', Validators.requiredTrue]
            },
        );
    }

    constructor(private route: ActivatedRoute,
                private _formBuilder: UntypedFormBuilder, ) {

        this.route.queryParams.subscribe((params) => {
            this.formCode = params['form'];
        });

        console.log('Form code: ' + this.formCode);
    }



    private openDialog() {
        let timerInterval;
        Swal.fire({
            title: "Bentornato ",
                // + this.customerResult.customer.name,
            html: "Recupero i tuoi dati e ti porto a prenotare il tavolo<b></b>",
            timer: 2500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${(Swal.getTimerLeft())} secondi`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
        });
    }



    onChangeEvent(selectedDate: MatDatepickerInputEvent<any, any>) {

        if (selectedDate.value instanceof DateTime) {

            // Update the 'dob' form field value
            this.registerCustomerForm.get('dob').setValue(selectedDate.value.year + '-' +
                selectedDate?.value?.month?.toString()?.padStart(2, '0')
                + '-' + selectedDate?.value?.day?.toString()?.padStart(2, '0'));
            console.log('Selected Date:', selectedDate.value);
        } else {
            // Handle invalid date if needed
            console.error('Invalid Date');
        }
    }

    horizontalStepperForm: UntypedFormGroup;

}

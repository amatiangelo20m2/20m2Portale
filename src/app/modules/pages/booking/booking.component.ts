import {Component, isStandalone, OnInit, ViewChild} from '@angular/core';
import {
    AbstractControl, FormControl, FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup, ValidatorFn,
    Validators
} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DatePipe, NgClass, NgForOf, NgIf, registerLocaleData} from "@angular/common";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FuseAlertComponent, FuseAlertType} from "../../../../@fuse/components/alert";
import localeIt from '@angular/common/locales/it';
import {OptCodeDialogComponent} from "./optconfirm/optconfirm.component";
import {MatDialog} from "@angular/material/dialog";
import {DateTime} from "luxon";
import {BookingControllerService, CustomerFormData} from "../../../core/booking";

registerLocaleData(localeIt, 'it');
const mobilePhonePattern = /^[0-9]{5,15}$/;

@Component({
    selector: 'booking',
    templateUrl: './booking.component.html',
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

    @ViewChild('signUpNgForm') signUpNgForm: NgForm;


    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };

    phoneValidationForm: FormGroup;
    registerCustomerForm: FormGroup;

    showAlert: boolean = false;

    isPhoneVerified : boolean = false;

    dob: Date | null;

    customerFormData : CustomerFormData;
    branchCode: string;
    formCode: string;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private _bookingService: BookingControllerService,
        public dialog: MatDialog) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.route.queryParams.subscribe((params) => {
            this.branchCode = params['branchCode'];
            this.formCode = params['form'];
            console.log('Branch Code from URL: ' +  this.branchCode + ' - form code: ' + this.formCode );

            this._bookingService.retrieveFormData(this.branchCode, this.formCode)
                .subscribe((customerFormData: CustomerFormData)=>{
                    this.customerFormData = customerFormData;
                    console.log(this.customerFormData);


                });

            this.phoneValidationForm = this._formBuilder.group({
                    mobilePhone      : ['', Validators.required],
                    selectedCountry      : ['39', Validators.required],
                },
            );

            this.registerCustomerForm = this._formBuilder.group({
                    name      : ['', Validators.required],
                    lastname  : ['', Validators.required],
                    email  : ['', Validators.required],
                    dob  : ['', Validators.required],
                    agreements: ['', Validators.requiredTrue]
                },
            );
        });
    }

    onChangeEvent(selectedDate: MatDatepickerInputEvent<any, any>) {
        console.log(selectedDate.value)
        if (selectedDate.value instanceof DateTime) {
            // Update the 'dob' form field value
            this.registerCustomerForm.get('dob').setValue(selectedDate.value);
            console.log('Selected Date:', selectedDate.value);
        } else {
            // Handle invalid date if needed
            console.error('Invalid Date');
        }
    }

    validatePhone(): void {

        if ( this.phoneValidationForm.invalid ) {
            return;
        }

        // this.phoneValidationForm.disable();
        this.showAlert = false;



        console.log("phone : " + this.phoneValidationForm.get('mobilePhone').value);
        console.log("clountry : " + this.phoneValidationForm.get('selectedCountry').value);

        let number = this.phoneValidationForm.get('selectedCountry').value.toString()
            + this.phoneValidationForm.get('mobilePhone').value.toString();

        this._bookingService.retrieveCustomerAndSendOtp(this.branchCode,
            number
            , "").subscribe(
            (response)=>{
                console.log(response);
                this.openDialog(response?.opt);
            }
        );
    }

    openDialog(opt: string): void {
        const dialogRef = this.dialog.open(OptCodeDialogComponent, {
            width: '50vw',
            maxWidth: '350px',
            data: {
                otpValue: opt,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed with result:', result);
            this.isPhoneVerified = result;
            this.phoneValidationForm.get('mobilePhone').disable();
        });
    }

    registerCustomerAndGoToReservationPage() {
        if (this.registerCustomerForm.invalid ) {
            return;
        }
        this.showAlert = false;

        // name: string, lastname: string, email: string, prefix: string, phone: string, dob: string, treatmentPersonalData:
        this._bookingService.registerCustomer(
            this.registerCustomerForm.get('name').value,
            this.registerCustomerForm.get('lastname').value,
            this.registerCustomerForm.get('email').value,
            this.phoneValidationForm.get('selectedCountry').value,
            this.phoneValidationForm.get('mobilePhone').value,
            this.registerCustomerForm.get('dob').value,
            true).subscribe((customer)=>{
                console.log("customer save:  " + customer)
        });


    }

}

import {Component, isStandalone, OnInit, ViewChild} from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FuseAlertComponent, FuseAlertType} from "../../../../@fuse/components/alert";
import localeIt from '@angular/common/locales/it';
import {BookingControllerService, CustomerFormData} from "../../../core/booking";
import {OptCodeDialogComponent} from "./optconfirm/optconfirm.component";
import {MatDialog} from "@angular/material/dialog";

registerLocaleData(localeIt, 'it');

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

    phoneValidationForm: UntypedFormGroup;
    showAlert: boolean = false;

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
        });
    }

    validatePhone(): void {

        if ( this.phoneValidationForm.invalid ) {
            return;
        }

        this.phoneValidationForm.disable();
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
                this.openDialog();
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(OptCodeDialogComponent, {
            width: '250px',
            data: {} // You can pass data to the dialog if needed
        });

        dialogRef.afterClosed().subscribe(result => {
            // Handle the result from the dialog (e.g., opt code)
            console.log('Dialog closed with result:', result);
        });
    }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
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
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FuseAlertComponent, FuseAlertType} from "../../../../@fuse/components/alert";
import localeIt from '@angular/common/locales/it';
import {MatDialog} from "@angular/material/dialog";
import {DateTime} from "luxon";
import {MatTabsModule} from "@angular/material/tabs";
import {Subscription} from "rxjs";
import {MatTooltipModule} from "@angular/material/tooltip";
import Swal from "sweetalert2";


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
        MatTabsModule,
        MatTooltipModule,
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

    //state machine
    chooseTable: boolean = false;

    phoneValidationForm: FormGroup;
    registerCustomerForm: FormGroup;
    showAlert: boolean = false;
    isPhoneVerified : boolean = false;
    dob: Date | null;
    // customerFormData: CustomerFormData;
    customerFormDataSubscription: Subscription;
    // customer: Customer;
    branchCode: string;
    formCode: string;
    currentPhotoUrl: string;
    // customerResult: CustomerResult;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        // private _bookingService: BookingControllerService,
        public dialog: MatDialog) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.branchCode = params['branchCode'];
            // this.formCode = params['form'];
            // console.log('Branch Code from URL: ' +  this.branchCode + ' - form code: ' + this.formCode );

            // this.customerFormData$ = this._bookingService.retrieveFormData(this.branchCode, this.formCode);

            // this.customerFormDataSubscription = this._bookingService.retrieveFormData(this.branchCode, this.formCode)
            //     .subscribe((data: CustomerFormData) => {
            //         this.customerFormData = data;
            //     });

            // this.phoneValidationForm = this._formBuilder.group({
            //         mobilePhone      : ['', Validators.required],
            //         selectedCountry      : ['39', Validators.required],
            //     },
            // );
            //
            // this.registerCustomerForm = this._formBuilder.group({
            //         name      : ['', Validators.required],
            //         lastname  : ['', Validators.required],
            //         email  : ['', Validators.required],
            //         dob  : ['', Validators.required],
            //         agreements: ['', Validators.requiredTrue]
            //     },
            // );

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

    // validatePhone(): void {
    //
    //     if ( this.phoneValidationForm.invalid ) {
    //         return;
    //     }
    //
    //     // this.phoneValidationForm.disable();
    //     this.showAlert = false;
    //
    //     console.log("phone : " + this.phoneValidationForm.get('mobilePhone').value);
    //     console.log("clountry : " + this.phoneValidationForm.get('selectedCountry').value);
    //
    //     this._bookingService.retrieveCustomerAndSendOtp(this.branchCode, this.phoneValidationForm.get('selectedCountry').value.toString(),
    //         this.phoneValidationForm.get('mobilePhone').value.toString()
    //          ).subscribe(
    //         (customerResult : CustomerResult)=> {
    //             this.customerResult = customerResult;
    //             if(this.customerResult.customerFound){
    //                 this.registerCustomerForm = this._formBuilder.group({
    //                         name      : [this.customerResult?.customer?.name, Validators.required],
    //                         lastname  : [this.customerResult?.customer?.lastname, Validators.required],
    //                         email  : [this.customerResult?.customer?.email, Validators.required],
    //                         dob  : [this.customerResult?.customer?.dob, Validators.required],
    //                         agreements: [this.customerResult?.customer?.treatmentPersonalData, Validators.requiredTrue]
    //                     },
    //                 );
    //             }
    //             this.currentPhotoUrl = customerResult?.profilePhoto;
    //             this.openDialog(customerResult?.opt);
    //         }
    //     );
    // }

    // openDialog(opt: string): void {
    //     const dialogRef = this.dialog.open(OptCodeDialogComponent, {
    //         width: '50vw',
    //         maxWidth: '350px',
    //         data: {
    //             otpValue: opt,
    //         }
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         if(result && this.customerResult.customerFound){
    //
    //             console.log('Dialog closed with result and customer found:', result);
    //             this.isPhoneVerified = result;
    //             this.phoneValidationForm.get('mobilePhone').disable();
    //             let timerInterval;
    //
    //             Swal.fire({
    //                 title: "Bentornato " + this.customerResult.customer.name,
    //                 html: "Recupero i tuoi dati e ti porto a prenotare il tavolo<b></b>",
    //                 timer: 2500,
    //                 timerProgressBar: true,
    //                 didOpen: () => {
    //                     Swal.showLoading();
    //                     const timer = Swal.getPopup().querySelector("b");
    //                     timerInterval = setInterval(() => {
    //                         timer.textContent = `${(Swal.getTimerLeft())} secondi`;
    //                     }, 100);
    //                 },
    //                 willClose: () => {
    //                     clearInterval(timerInterval);
    //                 }
    //             }).then((result) => {
    //                 this.customer = this.customerResult.customer;
    //                 this.chooseTable = true;
    //             });
    //         }else if(result){
    //
    //             console.log('Dialog closed with result:', result);
    //
    //             this.isPhoneVerified = result;
    //             this.phoneValidationForm.get('mobilePhone').disable();
    //
    //             Swal.fire({
    //                 title: "Cellulare verificato",
    //                 text: "",
    //                 timer: 1500,
    //                 showConfirmButton: false,
    //                 icon: "success"
    //             });
    //
    //         }else{
    //
    //             console.log('Dialog closed with result:', result);
    //             this.isPhoneVerified = false;
    //             this.phoneValidationForm.get('mobilePhone').enable();
    //
    //             Swal.fire({
    //                 title: "Codice non valido",
    //                 text: "",
    //                 timer: 2500,
    //                 showConfirmButton: false,
    //                 icon: "error"
    //             });
    //
    //
    //         }
    //
    //     });
    // }

    // registerCustomerAndGoToReservationPage() {
    //     if (this.registerCustomerForm.invalid ) {
    //         return;
    //     }
    //     this.showAlert = false;
    //
    //     // name: string, lastname: string, email: string, prefix: string, phone: string, dob: string, treatmentPersonalData:
    //     this._bookingService.registerCustomer(
    //         this.branchCode,
    //         this.registerCustomerForm.get('name').value,
    //         this.registerCustomerForm.get('lastname').value,
    //         this.registerCustomerForm.get('email').value,
    //         this.phoneValidationForm.get('selectedCountry').value,
    //         this.phoneValidationForm.get('mobilePhone').value,
    //         this.registerCustomerForm.get('dob').value,
    //         true,
    //         this.currentPhotoUrl).subscribe((customer : Customer)=>{
    //         this.customer = customer;
    //         this.chooseTable = true;
    //     });
    // }
    registerCustomerAndGoToReservationPage() {

    }
}

import {Component, OnInit} from '@angular/core';
import {BookingControllerService, Customer, CustomerFormData, CustomerResult} from "../../../core/booking";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FuseAlertComponent, FuseAlertType} from "../../../../@fuse/components/alert";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import Swal from "sweetalert2";
import {CustomcalendarComponent} from "./customcalendar/customcalendar.component";
import {BookingData} from "./utils/booking_data";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DateTime} from "luxon";

@Component({
    selector: 'tablehunter',
    templateUrl: './tablehunter.component.html',
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
        CustomcalendarComponent,
        MatTooltipModule,
        NgClass,
        RouterLink
    ],
    standalone: true
})
export class TablehunterComponent implements OnInit{
    branchCode: any;
    formCode: any;
    customerFormData: CustomerFormData;
    phoneValidationForm: FormGroup;
    showAlert: boolean = false;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };

    reservation_status: string;
    customerResult: CustomerResult;
    bookingData: BookingData;
    formFieldHelpers: string[] = [''];
    registerCustomerForm: FormGroup;
    formReservationDetails: UntypedFormGroup;


    ngOnInit(): void {
        this.reservation_status = 'CHOOSE_NUMBER';

        this.phoneValidationForm = this._formBuilder.group({
                mobilePhone      : ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10,}$/)]],
                selectedCountry      : ['39', Validators.required],
            },
        );

        this.formReservationDetails = this._formBuilder.group({
            dogsAllowed     : ['No'],
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

    constructor(private _bookingService: BookingControllerService,
                private route: ActivatedRoute,
                private _formBuilder: UntypedFormBuilder) {

        this.route.queryParams.subscribe((params) => {
            this.branchCode = params['branchCode'];
            this.formCode = params['form'];
            this._bookingService.retrieveFormData(this.branchCode, this.formCode)
                .subscribe((data: CustomerFormData) => {
                    this.customerFormData = data;
                });

        });
    }

    insertPhone() {
        if ( this.phoneValidationForm.invalid ) {
            return;
        }
        this.showAlert = false;

        this._bookingService.retrieveCustomer(this.phoneValidationForm.get('selectedCountry').value.toString(),
            this.phoneValidationForm.get('mobilePhone').value.toString()
        ).subscribe(
            (customerResult : CustomerResult)=> {
                this.customerResult = customerResult;
                if(customerResult.customerFound){
                    this.openDialog();
                }else{
                    this.reservation_status = 'CHOOSE_TABLE';
                }
            }
        );


    }

    private openDialog() {
        let timerInterval;
        Swal.fire({
            title: "Bentornato " + this.customerResult.customer.name,
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
            this.reservation_status = 'CHOOSE_TABLE';
        });
    }

    handleCalendarData($bookingData: BookingData) {
        console.log($bookingData);
        this.bookingData = $bookingData;
        if(this.customerResult.customerFound){
            this.reservation_status = 'CHOOSE_BOOKING_DETAILS';
        }else{
            this.reservation_status = 'INSERT_CUSTOMER_DETAILS';
        }
    }

    returnToChoosePage() {
        this.reservation_status = 'CHOOSE_TABLE';
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

    registerCustomerAndGoToReservationPage() {
        if (this.registerCustomerForm.invalid ) {
            return;
        }
        this.showAlert = false;

        // name: string, lastname: string, email: string, prefix: string, phone: string, dob: string, treatmentPersonalData:
        this._bookingService.registerCustomer(
            this.branchCode,
            this.registerCustomerForm.get('name').value,
            this.registerCustomerForm.get('lastname').value,
            this.registerCustomerForm.get('email').value,
            this.phoneValidationForm.get('selectedCountry').value,
            this.phoneValidationForm.get('mobilePhone').value,
            this.registerCustomerForm.get('dob').value,
            true,
            '').subscribe((customer : Customer)=>{
            this.customerResult.customer = customer;
            this.reservation_status = 'CHOOSE_BOOKING_DETAILS';
        });
    }

    performBooking() {
        this._bookingService.createBooking({
            branchCode: this.customerFormData.branchCode,
            formCode: this.customerFormData.formCode,
            customerId: this.customerResult.customer.customerId,
            date: this.bookingData.selectedDate,
            guests: this.bookingData.selectedGuests,
            time: this.bookingData.selectedTime,
            particularRequests: this.formReservationDetails.get('particularRequest').value,
            dogsAllowed: this.formReservationDetails.get('dogsAllowed').value,
            branchAddress: this.customerFormData.address,
            branchName: this.customerFormData.branchName,
            child: 0
        }).subscribe((reservation)=>{
            console.log("reservation registered");
            Swal.fire({
                title: "Prenotazione registrata con successo",
                text: "A breve riceverai un messaggio con tutti i dettagli. Grazie mille! 😎",
                showConfirmButton: true,
                icon: "success"
            });
        });
    }
}

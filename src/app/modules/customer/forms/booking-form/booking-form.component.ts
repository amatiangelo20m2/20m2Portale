import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {NgClass, NgIf} from "@angular/common";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DateTime} from "luxon";
import {FormControllerService, FormDTO} from 'app/core/restaurant_service';
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    imports: [
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
        MatCardModule
    ],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class BookingFormComponent implements OnInit {

    @Input() formDTO : FormDTO;

    formFieldHelpers: string[] = [''];

    ngOnInit(): void {

        this.formBooking = this._formBuilder.group({
            step1: this._formBuilder.group({


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
    }

    constructor(private _formBuilder: UntypedFormBuilder,
                private _formControllerService: FormControllerService) {
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

    formBooking: UntypedFormGroup;

    dateChange($event: MatDatepickerInputEvent<any, any>) {
        if ($event.value instanceof DateTime) {
            let date : DateTime = $event.value;
            console.log(date);

        }else{
            console.error('Invalid Date');
        }

    }

    protected readonly FormDTO = FormDTO;
    dateSelected = Date;

}

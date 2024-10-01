import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {catchError, debounceTime, distinctUntilChanged, filter, throwError} from 'rxjs';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatStepperModule} from "@angular/material/stepper";
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomerControllerService, FormDTO} from "../../../../core/restaurant_service";

@Component({
    selector: 'app-redirect-form',
    templateUrl: './redirect-form.component.html',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatListModule,
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        NgClass,
        MatDatepickerModule,
        MatStepperModule,
    ],
    standalone: true,
})
export class RedirectFormComponent implements OnInit {
    @Input() formDTO: FormDTO;
    formRedirect: UntypedFormGroup;
    showCustomerForm: boolean = false;


    constructor(
        private _customerControllerService: CustomerControllerService,
        private _formBuilder: FormBuilder,
        private _stateManager: StateManagerProvider) {

    }
    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.showCustomerForm = false;
        this.formRedirect = this._formBuilder.group({
            customerId: [null], // Assuming no validation for ID
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.minLength(10), Validators.pattern(/^\d{8,}$/)]],
            prefix: ['39', [Validators.required]],
            birthDate: [null],
            presenceCount: [null],
            origin: [''],
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

        this.formRedirect.get('phone').valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                filter(value => value.length >= 8),
                filter(value => this.formRedirect.get('phone').valid)
            )
            .subscribe(() => {
                this.onPhoneBlur();
            });

    }

    onPhoneBlur(): void {
        const phone = this.formRedirect.get('phone')?.value;
        const country = this.formRedirect.get('prefix')?.value;

        if (phone && country && phone.length >= 8 && this.formRedirect.get('phone')?.valid) {
            this._customerControllerService
                .findcustomerByPhoneAndPrefix(country, phone)
                .subscribe((customer) => {
                    if (customer) {
                        this._stateManager.showToast('Bentornato ' + customer.firstName, 'success', '#3B3F5C');
                        this.showCustomerForm = true;
                        this.formRedirect.patchValue({
                            postalCode: customer.postalCode,
                            firstName: customer.firstName,
                            lastName: customer.lastName,
                            email: customer.email,
                            privacyConsent: customer.privacyConsent,
                        });
                        let timerInterval;
                        Swal.fire({
                            title: "Bentornato " + customer.firstName + '😀..  ',
                            html: "Andiamo alla pagina richiesta in <b></b> ..",
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = (Math.round(Swal.getTimerLeft() / 1000)).toString();
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                window.open(this.formDTO.redirectPage, '_blank');
                                //RESET FORM
                                this.initForm();
                            }
                        });
                    } else {
                        this.showCustomerForm = true;

                    }
                });
        } else {
            console.log('Phone number is invalid or too short');
        }
    }

    saveCustomerAndOpenNewTab(redirectPage: string): void {
        if (this.formRedirect.valid) {
            const formData = this.formRedirect.value;

            console.log('Form data:', formData);

            this._customerControllerService.save(this.formRedirect.value).pipe(
                catchError((error) => {
                    // Catch "409 Conflict" responses email already in use
                    if ( error instanceof HttpErrorResponse && error.status === 409 ) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: error.error,
                            // footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    }

                    return throwError(error);
                }),
            ).subscribe(value => {
                let timerInterval;
                Swal.fire({
                    title: 'Grazie mille😀..  ',
                    html: "Andiamo alla pagina richiesta in <b></b> ..",
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = (Math.round(Swal.getTimerLeft() / 1000)).toString();
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.open(this.formDTO.redirectPage, '_blank');
                        //RESET FORM
                        this.initForm();
                    }
                });
            });

        } else {
            console.log('Form is invalid, please fill all required fields');
        }
    }
}

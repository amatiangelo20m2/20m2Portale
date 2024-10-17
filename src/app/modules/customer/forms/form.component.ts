import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FuseAlertComponent} from "../../../../@fuse/components/alert";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, MatOptionModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {NgClass, NgForOf, NgIf, registerLocaleData} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import localeIt from '@angular/common/locales/it';
import {BookingFormComponent} from "./booking-form/booking-form.component";
import {RedirectFormComponent} from "./redirect-form/redirect-form.component";
import {catchError, of} from "rxjs";
import {Error500Component} from "../../pages/error500/error500.component";
import {FormControllerService, FormDTO} from "../../../core/restaurant_service";
registerLocaleData(localeIt);

@Component({
    selector: 'tablehunter',
    templateUrl: './form.component.html',
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
        MatStepperModule,
        BookingFormComponent,
        RedirectFormComponent,
        Error500Component
    ],
    standalone: true
})
export class FormComponent implements OnInit{

    formCode: any;
    formDTO : FormDTO;

    isLoading = true;
    isError = false;  // Add error flag

    ngOnInit(): void {

    }
    constructor(private route: ActivatedRoute,
                private _formControllerService: FormControllerService) {

        this.route.queryParams.subscribe((params) => {
            this.formCode = params['form'];

            this._formControllerService.retrieveByFormCode(this.formCode)
                .pipe(
                    catchError((error) => {
                        console.error('Error fetching form:', error);
                        this.isError = true;  // Set error flag
                        this.isLoading = false;  // Stop loading indicator
                        return of(null);  // Return a null observable to keep the stream alive
                    })
                )
                .subscribe(formDTO => {
                    if (formDTO) {
                        this.formDTO = formDTO;
                        this.isError = false;  // Reset error flag if successful
                    }
                    this.isLoading = false;  // Set loading to false once done
                });
        });
    }

    protected readonly FormDTO = FormDTO;
}

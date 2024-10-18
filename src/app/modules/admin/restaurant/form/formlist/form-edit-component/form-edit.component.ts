import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../../../../environments/environment";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {StateManagerProvider} from "../../../../../../state_manager/state-manager-provider.service";
import {RestaurantStateManagerProvider} from "../../../../../../state_manager/restaurant-state-manager";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {RegularopeningconfComponent} from "./regular-opening-cong/regularopeningconf.component";
import {SpecialdayscomponentComponent} from "./special-days-opening-conf/specialdayscomponent.component";
import {FormControllerService, FormDTO} from "../../../../../../core/restaurant_service";
import {MatCardModule} from "@angular/material/card";
import FormStatusEnum = FormDTO.FormStatusEnum;
import {UtilityForm} from "../utility";
import {BookingFormComponent} from "../../../../../customer/forms/booking-form/booking-form.component";

@Component({
    selector: 'form-edit-component',
    templateUrl: './form-edit.component.html',
    imports: [
        MatProgressBarModule,
        MatButtonModule,
        RouterLink,
        MatTooltipModule,
        MatIconModule,
        FormsModule,
        NgClass,
        MatChipsModule,
        MatAutocompleteModule,
        MatInputModule,
        NgForOf,
        NgIf,
        MatSlideToggleModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatListModule,
        MatCheckboxModule,
        MatGridListModule,
        RegularopeningconfComponent,
        SpecialdayscomponentComponent,
        MatCardModule,
        BookingFormComponent,
        NgStyle
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default
})
export class FormEditComponent implements OnInit{

    form: FormDTO;

    formCode: string;

    @Input() tooltip: string;

    constructor(
        private _snackBar: MatSnackBar,
        private _formController: FormControllerService,
        private _stateManager : StateManagerProvider,
        private _restaurantStateManager : RestaurantStateManagerProvider,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.formCode = params['formCode'];
            console.log('Form Code:', this.formCode);

            this._formController.retrieveByFormCode(this.formCode).subscribe(
                value => {
                    this.form = value;
                }
            );
            // Additional logic to fetch form details using formCode
        });

        this.timeSlot = UtilityForm.generateTimeSlots();
    }

    copyToClipboard(formCode: string, type: number) {
        let textarea = document.createElement('textarea');
        if(type == 0){
            textarea.value = this.getIframeUrl(formCode);
        }else{
            textarea.value = this.getFormUrl(formCode);
        }

        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this._stateManager.showToast('Testo copiato', 'success');
    }

    getFormUrl(formCode: string) {
        return environment.formUrl + '/reservation?form=' +  formCode;
    }

    getIframeUrl(formCode: string) {
        return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                    <iframe src="${this.getFormUrl(formCode)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>`;
    }

    updateRedirectPage(form: FormDTO): void {
        console.log('Updated Redirect Page for Form ID:', form.formId);
        console.log('New Redirect Page:', form.redirectPage);

        this._formController.editForm(form).subscribe(
            formDto => {

                this._stateManager
                    .showToast('Redirect page aggiornata [' + formDto.redirectPage + ']',
                        'success');

                this._restaurantStateManager.retrieveFormByBranchCode();


            },
            error => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000,
                });
            }
        );
    }

    protected readonly FormStatusEnum = FormStatusEnum;




    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    currentTag: string = ''; // Using a simple string instead of model
    tags: string[] = [''];
    defaultsTag: string[] = ['Cena', 'Pranzo', 'Festivo', 'SantoPatrono', 'Risparmiatori', 'Facoltosi'];

    // Filtered fruits based on the current input
    get filteredFruits(): string[] {
        const lowerCaseFruit = this.currentTag.toLowerCase();
        return lowerCaseFruit
            ? this.defaultsTag.filter(fruit => fruit.toLowerCase().includes(lowerCaseFruit))
            : this.defaultsTag.slice();
    }

    readonly announcer = inject(LiveAnnouncer);

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.tags.push(value);
        }

        // Clear the input value
        this.currentTag = '';
    }

    remove(fruit: string): void {
        const index = this.tags.indexOf(fruit);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.announcer.announce(`Removed ${fruit}`);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tags.push(event.option.viewValue);
        this.currentTag = '';
        event.option.deselect();
    }

    trackByFn(index: number, item: string): number {
        return index; // or return item.id if your items have unique ids
    }

    onFileSelected($event: Event) {

    }

    onToggle($event: MatSlideToggleChange) {

        if(this.form.formStatus == FormStatusEnum.ATTIVO){
            this.form.formStatus = FormStatusEnum.SOSPESO;
        }else{
            this.form.formStatus = FormStatusEnum.ATTIVO;
        }


        this._formController.editForm(this.form).subscribe(
            formDto => {
                this._snackBar.open(formDto.formName + ' è ora in stato ' + formDto.formStatus + '', 'Undo', {
                    duration: 3000,
                });
            },
            error => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000,
                });
            }
        );
    }

    protected readonly FormDTO = FormDTO;
    timeSlot: String[] = [];
    cutterValue: number[] = [0,15,30,45,60,90,120];



    message : any;
    dogSizes: number[] = [0,15,30];
}

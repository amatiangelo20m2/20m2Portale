import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {StateManagerProvider} from "../../../../../../state_manager/state-manager-provider.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {RegularopeningconfComponent} from "./regular-opening-cong/regularopeningconf.component";
import {SpecialdayscomponentComponent} from "./special-days-opening-conf/specialdayscomponent.component";
import {FormDTO} from "../../../../../../core/restaurant_service";
import {MatCardModule} from "@angular/material/card";
import {UtilityForm} from "../utility";
import {BookingFormComponent} from "../../../../../customer/forms/booking-form/booking-form.component";
import {FormStateManager} from "./form_state_manager";
import {environment} from "../../../../../../../environments/environment";

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
        private _formStateManager : FormStateManager,
        private _stateManager : StateManagerProvider,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.formCode = params['formCode'];
            console.log('Form Code:', this.formCode);
            this._formStateManager.retrieveFormByCode(this.formCode);
            this._formStateManager
                .formDTO$.subscribe(value => {
                this.form = value;
            });
        });
    }

    getFormUrl(formCode: string) {
        return environment.formUrl + '/bfrm?form=' +  formCode;
    }

    getIframeUrl(formCode: string) {
        return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                    <iframe src="${this.getFormUrl(formCode)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>`;
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

    protected readonly FormDTO = FormDTO;

    protected readonly FormStateManager = FormStateManager;
    protected readonly UtilityForm = UtilityForm;
}

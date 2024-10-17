import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {UtilityForm} from "../../../utility";
import {StateManagerProvider} from "../../../../../../../../state_manager/state-manager-provider.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TranslocoModule} from "@ngneat/transloco";
import {MatListModule} from "@angular/material/list";
import {catchError, throwError} from "rxjs";
import {FormControllerService, FormDTO, TimeRange} from "../../../../../../../../core/restaurant_service";

@Component({
    selector: 'app-add-general-time-range',
    templateUrl: './add-general-time-range.component.html',
    imports: [
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        NgForOf,
        MatCheckboxModule,
        TranslocoModule,
        MatListModule
    ],
    standalone: true
})
export class AddGeneralTimeRangeComponent implements OnInit {

    timeSlot: string[];

    form : FormDTO;
    @Output() formUpdated = new EventEmitter<FormDTO>();

    constructor(
        private _dataServiceManager: StateManagerProvider,
        private _formControllerService: FormControllerService,
        @Inject(MAT_DIALOG_DATA) public data: { form: FormDTO }) {

    }

    ngOnInit(): void {
        this.timeSlot = UtilityForm.generateTimeSlots();
        this.form = this.data.form;
    }

    timeRangeConf : TimeRange;

    onSelectChange($event: Event, type: number) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedValue = selectElement.value;

        // Split the selected value (HH:mm) into hours and minutes
        const [selectedHour, selectedMinutes] = selectedValue.split(':').map(Number);

        // If type is 0, update opening time; if type is 1, update closing time
        if (type === 0) {
            if (this.timeRangeConf == null){
                this.timeRangeConf = {
                    openingHour: 0,
                    closingHour: 0,
                    openingMinutes: 0,
                    closingMinutes: 0
                };
            }
            this.timeRangeConf.openingHour = selectedHour;
            this.timeRangeConf.openingMinutes = selectedMinutes;
        } else if (type === 1) {
            if(this.timeRangeConf == null){
                this.timeRangeConf = {
                    openingHour: 0,
                    closingHour: 0,
                    openingMinutes: 0,
                    closingMinutes: 0
                }
            }
            this.timeRangeConf.closingHour = selectedHour;
            this.timeRangeConf.closingMinutes = selectedMinutes;
        }
    }

    createDateRange() {
        this._formControllerService
            .addDefaultTimeRangeForAllDays(
                this.timeRangeConf,
                this.form.formCode,
                'body').pipe(
            catchError(error => {
                // Log the error to the console
                console.error('Error during API call:', error);
                // Optionally show a message to the user (for example, using your toast service)
                this._dataServiceManager.showToast('Errore durante l\'inserimento della configurazione', 'error');
                // Return the error so the observable chain terminates gracefully
                return throwError(error);
            })
        ).subscribe(
            form => {
                this._dataServiceManager.showToast('Configurazione insertita correttamente', 'success');
                this.formUpdated.emit(form);
            }
        );
    }
    isDisabled() {

        return this.timeRangeConf != null
            && this.timeRangeConf.openingHour > 0
            && this.timeRangeConf.closingHour > 0;
    }
}

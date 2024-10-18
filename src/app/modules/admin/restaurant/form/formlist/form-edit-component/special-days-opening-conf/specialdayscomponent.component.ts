import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {UtilityForm} from "../../utility";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRippleModule} from "@angular/material/core";
import {
    CreateSpecialDayComponentComponent
} from "./create-special-day-component/create-special-day-component.component";
import {DateformatitaPipe} from "../../../../../../pages/components/pipe/dateformatita.pipe";
import {FormControllerService, FormDTO, OpeningHoursDTO, TimeRange} from "../../../../../../../core/restaurant_service";
import {StateManagerProvider} from "../../../../../../../state_manager/state-manager-provider.service";

@Component({
    selector: 'app-specialdayscomponent',
    templateUrl: './specialdayscomponent.component.html',
    imports: [
        MatIconModule,
        MatSlideToggleModule,
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatInputModule,
        MatCheckboxModule,
        MatRippleModule,
        CreateSpecialDayComponentComponent,
        DateformatitaPipe,
        NgIf
    ],
    standalone: true
})
export class SpecialdayscomponentComponent implements OnInit {

    timeSlot: string[];
    dogSizes: number[] = [0,15,30];

    @Input() form: FormDTO;
    @Input() tooltip: string;

    ngOnInit(): void {
        this.timeSlot = UtilityForm.generateTimeSlots();
    }


    constructor(private _formControllerService : FormControllerService, private _stateManagerProvider: StateManagerProvider) {
    }


    deleteTimeRange(formCode: string, timeRangeCode: string) {
        this._formControllerService.deleteConfHoursRangeByCode(formCode, timeRangeCode).subscribe(value => {
            console.log("Cancellato: " + timeRangeCode);
            this.form.specialDays.forEach(specialDay => {
                    specialDay.timeRanges = specialDay.timeRanges.filter(range => range.timeRangeCode !== timeRangeCode);
            })
        });
    }

    onSelectChange(formCode: string, timeRangeCode: string, $event: Event, number: number) {

    }

    getOpeningFormattedTime(timeRange: TimeRange) {
        return "";
    }

    isCurrentDateTimeGreaterThan18(openingHour: number, timeRangeCode: string) {
        return false;
    }

    getClosingFormattedTime(timeRange: TimeRange) {
        return "";
    }

    createTimeRange(formCode: string, specialDayCode: string, currentLengthOfConf) {
        if(currentLengthOfConf < 4 ){
            this._formControllerService.addTimeRangeSpecialDay(formCode, specialDayCode).subscribe(value =>{
                this.form = value;
            })
        }else{
            this._stateManagerProvider.showToast('Non puoi creare piu di 4 slot orari', 'error');
        }


    }
}

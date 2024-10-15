import {Component, Input, OnInit} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {StateManagerProvider} from "../../../../../../../state_manager/state-manager-provider.service";
import {TranslocoModule} from "@ngneat/transloco";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormControllerService, FormDTO} from "../../../../../../../core/restaurant_service";

@Component({
    selector: 'app-tablehoursconf',
    templateUrl: './tablehoursconf.component.html',
    imports: [
        MatSlideToggleModule,
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        TranslocoModule,
        NgIf,
        MatTooltipModule
    ],
    standalone: true
})
export class TablehoursconfComponent implements OnInit {


    constructor(private _formControllerService : FormControllerService,
                private _stateManagerProvider : StateManagerProvider) {
    }

    @Input() form: FormDTO;

    ngOnInit(): void {
        this.form.regularOpeningHours = this.form.regularOpeningHours.sort((a, b) => a.id - b.id);
    }

    @Input() tooltip: string;

    generateTimeSlots(): string[] {
        const timeSlots: string[] = [];

        for (let hour = 0; hour < 24; hour++) {
            // Format hour to always be two digits
            const formattedHour = hour.toString().padStart(2, '0');

            // Loop through minutes (0, 15, 30, 45)
            for (let minute = 0; minute < 60; minute += 15) {
                // Format minute to always be two digits
                const formattedMinute = minute.toString().padStart(2, '0');

                // Push the formatted time to the timeSlots array
                timeSlots.push(`${formattedHour}:${formattedMinute}`);
            }
        }

        return timeSlots;
    }

    changeStatusOfCurrentDay(formCode: string,
                             dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY") {

        this._formControllerService.switchOpeningStatus(formCode, dayOfWeek).subscribe(
            updatedForm => {
                this._stateManagerProvider.showToast(dayOfWeek + ' aggiornato', 'success', '#3B3F5C');
                this.form.regularOpeningHours.forEach(openingHourDTO => {
                    if(openingHourDTO.dayOfWeek == dayOfWeek){
                        openingHourDTO.closed = !openingHourDTO.closed;
                    }
                });
            }
        );

    }

    isCurrentDateTimeGreaterThan18(openingTime: number) : boolean {
        console.log('Check if ' + openingTime + ' hour is greater than 18')
        return openingTime < 18;
    }

    createTimeRange(formCode: string,
                    dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY") {

        this._formControllerService.addTimeRange({
            openingHour: 12,
            closingMinutes: 0,
            closingHour: 20,
            openingMinutes: 0
        }, formCode, dayOfWeek).subscribe(updatedForm => {
            this.form = updatedForm;
            this.form.regularOpeningHours = this.form.regularOpeningHours.sort((a, b) => a.id - b.id);
        });
    }

    deleteTimeRange(formCode: string,
                    confCode: string,
                    dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY") {
        this._formControllerService.deleteOpeningHourConfById(formCode, confCode).subscribe(value => {
            console.log("Cancellato: " + confCode);
            this.form.regularOpeningHours.forEach(openingHoursDTO => {
                if(openingHoursDTO.dayOfWeek == dayOfWeek){
                    openingHoursDTO.timeRanges = openingHoursDTO.timeRanges.filter(range => range.timeRangeCode !== confCode);
                }
            })
        });
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {StateManagerProvider} from "../../../../../../../state_manager/state-manager-provider.service";
import {TranslocoModule} from "@ngneat/transloco";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {FormControllerService, FormDTO, OpeningHoursDTO, TimeRange} from "../../../../../../../core/restaurant_service";

@Component({
    selector: 'app-regularopeningconf',
    templateUrl: './regularopeningconf.component.html',
    imports: [
        MatSlideToggleModule,
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        TranslocoModule,
        NgIf,
        MatTooltipModule,
        MatButtonModule,
        NgStyle
    ],
    standalone: true
})
export class RegularopeningconfComponent implements OnInit {

    timeSlot: string[];
    constructor(private _formControllerService : FormControllerService,
                private _stateManagerProvider : StateManagerProvider) {
    }

    @Input() form: FormDTO;

    ngOnInit(): void {
        this.form.regularOpeningHours = this.form.regularOpeningHours.sort((a, b) => a.id - b.id);
        this.timeSlot = this.generateTimeSlots();
        this.timeSlotMap.clear();
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
                this._stateManagerProvider.showToast(dayOfWeek + ' aggiornato', 'success');
                this.form.regularOpeningHours.forEach(openingHourDTO => {
                    if(openingHourDTO.dayOfWeek == dayOfWeek){
                        openingHourDTO.closed = !openingHourDTO.closed;
                    }
                });
            }
        );

    }

    isCurrentDateTimeGreaterThan18(openingTimeHour: number, timeRangeCode: string) : boolean {

        if(this.timeSlotMap.has(timeRangeCode)){
            return this.timeSlotMap.get(timeRangeCode).openingHour > 17;
        }else{
            return openingTimeHour > 17;
        }


    }

    createTimeRange(formCode: string,
                    dayOfWeek: OpeningHoursDTO) {

        //to not create more than 3 time range
        if(dayOfWeek.timeRanges.length < 4){
            this._formControllerService.addTimeRange({
                openingHour: 0,
                closingMinutes: 0,
                closingHour: 0,
                openingMinutes: 0
            }, formCode, dayOfWeek.dayOfWeek, 'body').subscribe(timeRange => {
                this.form.regularOpeningHours.forEach(openingHourDTO =>
                    {
                        if(openingHourDTO.dayOfWeek == dayOfWeek.dayOfWeek){
                            openingHourDTO.timeRanges.push(timeRange);
                        }
                    }
                );
                this.form.regularOpeningHours = this.form.regularOpeningHours.sort((a, b) => a.id - b.id);
            });
        }else{
            this._stateManagerProvider.showToast('Non puoi creare piu di 4 slot orari', 'error')
        }

    }

    deleteTimeRange(formCode: string,
                    confCode: string,
                    dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY") {
        this._formControllerService.deleteOpeningHourConfByCode(formCode, confCode).subscribe(value => {
            console.log("Cancellato: " + confCode);
            this.form.regularOpeningHours.forEach(openingHoursDTO => {
                if(openingHoursDTO.dayOfWeek == dayOfWeek){
                    openingHoursDTO.timeRanges = openingHoursDTO.timeRanges.filter(range => range.timeRangeCode !== confCode);
                }
            })
        });
    }

    /**
     *
     * return a date formatted (in this way -> 11:15; 11:00; 23:00; 23:45)
     * @param timeRange
     */
    getClosingFormattedTime(timeRange: TimeRange) {
            const hour = timeRange.closingHour?.toString().padStart(2, '0') || '00';
            const minute = timeRange.closingMinutes?.toString().padStart(2, '0') || '00';
            return `${hour}:${minute}`;
    }

    getOpeningFormattedTime(timeRange: TimeRange) {
        const hour = timeRange.openingHour?.toString().padStart(2, '0') || '00';
        const minute = timeRange.openingMinutes?.toString().padStart(2, '0') || '00';
        return `${hour}:${minute}`;
    }




    /**
     *  this map will keep track about changes on the hours list and than will be used to send the modify request
     */
    timeSlotMap = new Map<string, TimeRange>();

    /**
     * @param formCode
     * @param timeRangeCode
     * @param $event
     * @param type if is 0 is opening time, if 1 is closing time
     */
    onSelectChange(formCode: string,
                   timeRangeCode: string,
                   $event: Event,
                   type: number) {

        const selectElement = event.target as HTMLSelectElement;
        const selectedValue = selectElement.value;

        // Split the selected value (HH:mm) into hours and minutes
        const [selectedHour, selectedMinutes] = selectedValue.split(':').map(Number);

        // Retrieve the existing time range or create a new one if it doesn't exist
        let timeRange = this.timeSlotMap.get(timeRangeCode) || { timeRangeCode: timeRangeCode };

        timeRange.timeRangeCode = timeRangeCode;

        // If type is 0, update opening time; if type is 1, update closing time
        if (type === 0) {
            timeRange.openingHour = selectedHour;
            timeRange.openingMinutes = selectedMinutes;
        } else if (type === 1) {
            timeRange.closingHour = selectedHour;
            timeRange.closingMinutes = selectedMinutes;
        }

        // Update or insert the modified timeRange back into the map
        this.timeSlotMap.set(timeRangeCode, timeRange);

    }

    saveConfiguration(formCode: string, timeSlotMap: Map<string, TimeRange>) {

        //i take the list from the map and i'll use to send to the update method
        this._formControllerService.updateTimeRange(Array.from(timeSlotMap.values()), formCode, 'body').subscribe(
            formDTO => {
            this._stateManagerProvider.showToast('Configurazione oraria modificata con successo', 'success');
            this.timeSlotMap.clear();
            this.form = formDTO;
            this.form.regularOpeningHours = this.form.regularOpeningHours.sort((a, b) => a.id - b.id);
        });
    }
}

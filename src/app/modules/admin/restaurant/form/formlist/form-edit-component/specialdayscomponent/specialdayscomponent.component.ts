import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormDTO} from "../../../../../../../core/restaurant_service";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";

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
        MatTooltipModule
    ],
    standalone: true
})
export class SpecialdayscomponentComponent implements OnInit{
    @Input() form: FormDTO;

    ngOnInit(): void {

    }

    selectedHour: any;
    days: string[] = [
        'Lunedi',
        'Martedi',
        'Mercoldi',
        'Giovedi',
        'Venerdi',
        'Sabato',
        'Domenica'
    ];
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
}

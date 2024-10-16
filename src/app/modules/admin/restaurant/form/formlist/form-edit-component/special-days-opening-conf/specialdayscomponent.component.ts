import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormDTO} from "../../../../../../../core/restaurant_service";
import {UtilityForm} from "../../utility";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRippleModule} from "@angular/material/core";


import {
    CreateSpecialDayComponentComponent
} from "./create-special-day-component/create-special-day-component.component";

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
        CreateSpecialDayComponentComponent
    ],
    standalone: true
})
export class SpecialdayscomponentComponent implements OnInit {

    timeSlot: string[];

    @Input() form: FormDTO;
    @Input() tooltip: string;

    ngOnInit(): void {
        this.timeSlot = UtilityForm.generateTimeSlots();
    }


    constructor() {
    }



    selectedDate: Date | null = null;

    deleteTimeRange(formCode: string) {

    }
}

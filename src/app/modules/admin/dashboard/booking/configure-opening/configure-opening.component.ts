import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DayhoursComponent} from "./dayhours/dayhours.component";
import {BranchResponseEntity} from "../../../../../core/dashboard";
import {DataproviderService} from "../../dataprovider.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {EdithoursComponent} from "./dayhours/edit-hours/edithours.component";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioModule} from "@angular/material/radio";
import {environment} from "../../../../../../environments/environment";
import {BranchConfigurationDTO, BranchTimeRangeDTO, LocalTime, TimeRange} from "../../../../../core/booking";


@Component({
    selector: 'configure-opening',
    templateUrl: './configure-opening.component.html',
    styleUrls: ['./configure-opening.component.css'],
    imports: [
        MatDatepickerModule,
        MatListModule,
        MatButtonToggleModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSlideToggleModule,
        FormsModule,
        NgForOf,
        MatProgressSpinnerModule,
        NgIf,
        MatTableModule,
        MatTooltipModule,
        MatTabsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatChipsModule,
        NgStyle,
        MatRadioModule,
        NgClass
    ],
    standalone: true
})
export class ConfigureOpeningComponent implements OnInit{

    @Input() tooltip: string;

    currentBranch : BranchResponseEntity;
    url = "";
    restaurantConfigurationDTO : BranchConfigurationDTO;
    dataSource : BranchTimeRangeDTO[] = [];

    urlform: FormGroup;
    restaurantConfigForm: FormGroup;

    constructor(private _matDialog: MatDialog,
                private _dataProvideService: DataproviderService,
                private fb: FormBuilder,
                // private clipboard: Clipboard,
                // private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this._dataProvideService.branch$.subscribe((branch) => {
            this.currentBranch = branch;

            this.url = environment.hostname +'/reservation?branchCode=' + this.currentBranch.branchCode;

            this.urlform = this.fb.group({
                url: [this.url, /* Other Validators if needed */],
                iframe: [`<iframe src="${this.url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>\n`]
            });
            // this.cdr.detectChanges();
        });

        this._dataProvideService.restaurantConfiguration$.subscribe((branchConfigurationDTO : BranchConfigurationDTO)=>{
            this.restaurantConfigurationDTO = branchConfigurationDTO;
            this.restaurantConfigForm = this.fb.group({
                branchCode: [branchConfigurationDTO?.branchCode],
                guests: [branchConfigurationDTO?.guests ?? 0, Validators.required],
                bookingSlotInMinutes: [branchConfigurationDTO?.bookingSlotInMinutes.toString()],
                reservationConfirmedManually: [branchConfigurationDTO?.reservationConfirmedManually],
                guestReceivingAuthConfirm: [branchConfigurationDTO?.guestReceivingAuthConfirm],
                minBeforeSendConfirmMessage: [branchConfigurationDTO?.minBeforeSendConfirmMessage.toString()],
            });

            console.log(this.restaurantConfigForm)
        })

        this._dataProvideService?.restaurantConfiguration$.subscribe((restaurantConfiguration)=>{
            this.restaurantConfigurationDTO = restaurantConfiguration;

            this.dataSource = this.restaurantConfigurationDTO?.branchTimeRanges.map((branchTime: BranchTimeRangeDTO) => {
                return branchTime;
            }) || [];

            // this.cdr.detectChanges();
        });
    }
    saveConfiguration(): void {

        if (this.restaurantConfigForm.valid) {
            console.log("salvataggio..")
            console.log(this.restaurantConfigForm.value);

            this._dataProvideService.updateBranchBookingConfigration({
                    guests: this.restaurantConfigForm.get('guests')?.value,
                    bookingSlotInMinutes: +this.restaurantConfigForm.get('bookingSlotInMinutes')?.value,
                    branchCode: this.restaurantConfigForm.get('branchCode')?.value,
                    guestReceivingAuthConfirm: this.restaurantConfigForm.get('guestReceivingAuthConfirm')?.value,
                    minBeforeSendConfirmMessage: +this.restaurantConfigForm.get('minBeforeSendConfirmMessage')?.value,
                    reservationConfirmedManually: this.restaurantConfigForm.get('reservationConfirmedManually')?.value,
                }

            )

        } else {
            console.log('Invalid form. Please check the entered values.');
        }
    }

    openEditLabelsDialog() {
        this._matDialog.open(DayhoursComponent, {autoFocus: false});
    }
    getTime(timeRanges: Array<TimeRange>) {
        var timeSlotToShow = '';
        if(timeRanges.length > 0){
            timeRanges.forEach((timeRange)=>{
                    timeSlotToShow = timeSlotToShow + '[' +this.transform(timeRange?.startTime) + '-' + this.transform(timeRange.endTime) + '] ';
                }

            );
            return timeSlotToShow;
        }else {
            return 'CHIUSO';
        }
    }

    transform(localTime: LocalTime): string {
        if (!localTime) {
            return '';
        }
        // Extract hours and minutes
        const hours = localTime.toString().split(':')[0];
        const minutes = localTime.toString().split(':')[1];


        return `${hours}:${minutes}`;
    }

    copyUrl() {
        // this.clipboard.writeText(this.url);
        // this.snackBar.open('Copied to clipboard', 'Close', {
        //     duration: 2000,
        // });
    }

    editHour(timeRange: BranchTimeRangeDTO) {
        this._dataProvideService.setBranchTimeRangeDTOToUpdate(timeRange)
        this._matDialog.open(EdithoursComponent, {autoFocus: false});
    }
}

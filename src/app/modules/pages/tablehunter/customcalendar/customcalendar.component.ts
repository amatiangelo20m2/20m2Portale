// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
// import {MatDatepickerModule} from "@angular/material/datepicker";
// import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
// import {MatTabsModule} from "@angular/material/tabs";
// import {MatButtonModule} from "@angular/material/button";
// import {MatIconModule} from "@angular/material/icon";
// import {MatSnackBar} from "@angular/material/snack-bar";
// import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
// import {MatTooltipModule} from "@angular/material/tooltip";
// import {MatInputModule} from "@angular/material/input";
// import {MatOptionModule} from "@angular/material/core";
// import {MatSelectModule} from "@angular/material/select";
// import {BookingData} from "../utils/booking_data";
//
// @Component({
//     selector: 'customcalendar',
//     templateUrl: './customcalendar.component.html',
//     imports: [
//         DatePipe,
//         NgForOf,
//         MatDatepickerModule,
//         FormsModule,
//         MatTabsModule,
//         NgIf,
//         MatButtonModule,
//         MatIconModule,
//         NgClass,
//         MatProgressSpinnerModule,
//         MatTooltipModule,
//         MatInputModule,
//         MatOptionModule,
//         MatSelectModule,
//         ReactiveFormsModule
//     ],
//     standalone: true
// })
// export class CustomcalendarComponent implements OnInit {
//
//     @Input() configuration: CustomerFormData;
//
//     @Output() calendarData: EventEmitter<BookingData> = new EventEmitter<BookingData>();
//
//
//     guestsBookable: number[] = [];
//     bookableTime: string[] = [];
//     selectedSlotTime: string;
//
//     constructor(private _snackBar: MatSnackBar,
//                 private _formBuilder: UntypedFormBuilder,) {
//
//
//     }
//
//     displayedGuestsCount: number = 8;
//
//
//     showMoreGuests(): void {
//         this.displayedGuestsCount += 8;
//     }
//     ngOnInit(): void {
//         console.log('Customer Form Data in CustomcalendarComponent:', this.configuration);
//
//         this.currentDate = new Date();
//         this.calendar = new Calendar(
//             this.currentDate.getMonth(),
//             this.currentDate.getFullYear(),
//             this.configuration);
//
//         this.guestsBookable = Array.from({ length: this.configuration.maxTableNumber }, (_, index) => index + 1);
//     }
//
//     currentDate: Date;
//     calendar: Calendar;
//
//     selectedTabIndex = 0;
//     selectedDate: { day: number, month: number, year: number };
//
//     selectedGuests: number = 0;
//
//
//
//     async selectDay(selectedDay: DayInfo) {
//         if (!selectedDay.isOpen) {
//             this.selectedDate = {
//                 day: selectedDay.value,
//                 month: this.currentDate.getMonth(),
//                 year: this.currentDate.getFullYear()
//             };
//             await this.delay(300);
//             this.goToTab(1);
//         } else {
//             this._snackBar.open('Ci dispiace, in data '
//                 + selectedDay.value + '/'
//                 + this.currentDate.getMonth() + 1
//                 + '/' + this.currentDate.getFullYear() + ' siamo chiusi 😭', '', {
//                 duration: 2000
//             });
//         }
//
//     }
//
//     isSelected(selectedDay: DayInfo): boolean {
//         return (
//             this.selectedDate &&
//             selectedDay.value === this.selectedDate.day &&
//             this.currentDate?.getMonth() === this.selectedDate.month &&
//             this.currentDate?.getFullYear() === this.selectedDate.year
//         );
//     }
//
//     goToTab(index: number) {
//         this.selectedTabIndex = index;
//     }
//
//     getMonthByMonthNumber(monthnum: number): string{
//
//         switch (monthnum) {
//             case 0:
//                 return 'Gennaio';
//             case 1:
//                 return 'Febbraio';
//             case 2:
//                 return 'Marzo';
//             case 3:
//                 return 'Aprile';
//             case 4:
//                 return 'Maggio';
//             case 5:
//                 return 'Giugno';
//             case 6:
//                 return 'Luglio';
//             case 7:
//                 return 'Agosto';
//             case 8:
//                 return 'Settembre';
//             case 9:
//                 return 'Ottobre';
//             case 10:
//                 return 'Novembre';
//             case 11:
//                 return 'Dicembre';
//             default:
//                 return ''; // Handle invalid month numbers as needed
//         }
//     }
//
//     previousMonth() {
//         this.currentDate.setMonth(this.currentDate.getMonth() - 1);
//         this.calendar.currentMonth = this.currentDate.getMonth();
//         this.calendar.currentYear = this.currentDate.getFullYear();
//         this.calendar.initializeDaysInMonth();
//     }
//
//     nextMonth() {
//         this.currentDate.setMonth(this.currentDate.getMonth() + 1);
//         this.calendar.currentMonth = this.currentDate.getMonth();
//         this.calendar.currentYear = this.currentDate.getFullYear();
//         this.calendar.initializeDaysInMonth();
//     }
//
//     async selectGuest(guests: number) {
//         this.selectedGuests = guests;
//         this.selectedSlotTime = '';
//
//         this.bookableTime = [];
//
//         let dayOfWeek = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day).getDay();
//
//         const timeRanges: TimeRange[] = this.getTimeRange(dayOfWeek, this.configuration.branchTimeRangeDTOS);
//
//
//         if (timeRanges.length > 0) {
//             timeRanges.forEach((timeRange) => {
//
//                 const startHour: number = parseInt(timeRange?.startTime?.toString()?.substring(0, 2));
//                 const startMinutes: number = parseInt(timeRange?.startTime?.toString()?.substring(3, 5));
//                 const endHour: number = parseInt(timeRange?.endTime?.toString()?.substring(0, 2));
//                 const endMinutes: number = parseInt(timeRange?.endTime?.toString()?.substring(3, 5));
//
//                 let currentHour = startHour;
//                 let currentMinutes = startMinutes;
//
//                 while (currentHour < endHour || (currentHour === endHour && currentMinutes <= endMinutes)) {
//                     // Add the current time to the list
//                     const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;
//                     this.bookableTime.push(currentTime);
//
//                     // Add 30 minutes to the current time
//                     currentMinutes += this.configuration.bookingSlotInMinutes;
//
//                     // Check if the current minutes exceed 59, then increment the hour and reset minutes to 0
//                     if (currentMinutes >= 60) {
//                         currentHour++;
//                         currentMinutes = 0;
//                     }
//                 }
//             });
//             console.log(`Number of bookable slots: ${this.bookableTime.length}`);
//
//             //reorder list hours:minutes to make start from 00 to 23.59
//             this.bookableTime.sort((a, b) => {
//                 const timeA = a.split(":").map(Number);
//                 const timeB = b.split(":").map(Number);
//
//                 // Compare hours
//                 if (timeA[0] !== timeB[0]) {
//                     return timeA[0] - timeB[0];
//                 }
//
//                 // If hours are equal, compare minutes
//                 return timeA[1] - timeB[1];
//             });
//
//         } else {
//             console.error("No matching time range found for the selected day of the week.");
//         }
//         await this.delay(300);
//         this.goToTab(2);
//     }
//
//     delay(ms: number) {
//         return new Promise( resolve => setTimeout(resolve, ms) );
//     }
//
//     getTimeRange(dayOfWeek: number, timeRanges: BranchTimeRangeDTO[]): Array<TimeRange> {
//         const dayOfWeekMapping: { [key: number]: BranchTimeRangeDTO.DayOfWeekEnum } = {
//             0: 'DOMENICA',
//             1: 'LUNEDI',
//             2: 'MARTEDI',
//             3: 'MERCOLEDI',
//             4: 'GIOVEDI',
//             5: 'VENERDI',
//             6: 'SABATO'
//         };
//
//         const dayOfWeekEnum = dayOfWeekMapping[dayOfWeek];
//         const matchingTimeRange = timeRanges.find(range => range.dayOfWeek === dayOfWeekEnum);
//
//         return matchingTimeRange.timeRanges;
//     }
//
//     isGuestsValueSelected(guests: number) {
//         return this.selectedGuests === guests;
//     }
//
//     isTimeSlotValueSelected(bookSlot: string) {
//         return this.selectedSlotTime === bookSlot;
//     }
//
//     async selectTimeSlot(bookSlot: string) {
//         this.selectedSlotTime = bookSlot;
//         await this.delay(300);
//         this.emitCalendarData();
//     }
//
//     emitCalendarData() {
//         this.calendarData.emit({
//             selectedDate: this.selectedDate.year.toString()
//                 + (this.selectedDate.month+1).toString().padStart(2, '0')
//                 + this.selectedDate.day.toString().padStart(2, '0'),
//             selectedGuests: this.selectedGuests,
//             selectedTime: this.selectedSlotTime
//         });
//     }
//
//
//     getItalianMonthFromSelectedDate(selectedDate: { day: number; month: number; year: number }) {
//         switch(selectedDate.month){
//             case 0:
//                 return 'Gennaio';
//             case 1:
//                 return 'Febbraio';
//             case 2:
//                 return 'Marzo';
//             case 3:
//                 return 'Aprile';
//             case 4:
//                 return 'Maggio';
//             case 5:
//                 return 'Giugno';
//             case 6:
//                 return 'Luglio';
//             case 7:
//                 return 'Agosto';
//             case 8:
//                 return 'Settembre';
//             case 9:
//                 return 'Ottobre';
//             case 10:
//                 return 'Novembre';
//             case 11:
//                 return 'Dicembre';
//             default:
//                 return ' --- ';
//         }
//     }
// }
//
// class Calendar {
//     daysOfWeek: string[] = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
//     daysInMonth: DayInfo[] = [];
//
//     currentMonth: number;
//     currentYear: number;
//
//
//
//     customerFormData: CustomerFormData;
//
//     constructor(month: number,
//                 year: number,
//                 configuration: CustomerFormData) {
//
//         this.currentMonth = month;
//         this.currentYear = year;
//         this.customerFormData = configuration;
//         this.initializeDaysInMonth();
//     }
//
//     initializeDaysInMonth(): void {
//         const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
//         let startingDayIndex = firstDayOfMonth.getDay() - 1;
//
//         if (startingDayIndex === -1) {
//             startingDayIndex = 6;
//         }
//
//         const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
//
//         this.daysInMonth = Array.from({ length: daysInMonth + startingDayIndex }, (_, i) => {
//             const dayValue = i - startingDayIndex + 1;
//
//             let dayOfWeek = new Date(this.currentYear, this.currentMonth, dayValue).getDay();
//
//             const isOpen = this.isDayOfWeekClosed(dayOfWeek, this.customerFormData?.branchTimeRangeDTOS);
//
//             // const isOpen = false;
//             return new DayInfo(dayValue, isOpen, new Date(this.currentYear, this.currentMonth, dayValue) >= new Date());
//         });
//     }
//
//
//     isDayOfWeekClosed(dayOfWeek: number, timeRanges: BranchTimeRangeDTO[]): boolean {
//         const dayOfWeekMapping: { [key: number]: BranchTimeRangeDTO.DayOfWeekEnum } = {
//             0: 'DOMENICA',
//             1: 'LUNEDI',
//             2: 'MARTEDI',
//             3: 'MERCOLEDI',
//             4: 'GIOVEDI',
//             5: 'VENERDI',
//             6: 'SABATO'
//         };
//
//         const dayOfWeekEnum = dayOfWeekMapping[dayOfWeek];
//         const matchingTimeRange = timeRanges.find(range => range.dayOfWeek === dayOfWeekEnum);
//
//         return matchingTimeRange ? matchingTimeRange.closed : true;
//     }
//
// }
//
// class DayInfo {
//     value: number;
//     isOpen: boolean;
//     isEnabled: boolean;
//
//     constructor(value: number, isOpen: boolean, isEnabled: boolean) {
//         this.value = value;
//         this.isOpen = isOpen;
//         this.isEnabled = isEnabled;
//     }
// }

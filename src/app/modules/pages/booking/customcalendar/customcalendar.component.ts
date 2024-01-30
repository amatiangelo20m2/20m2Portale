import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BranchTimeRangeDTO, CustomerFormData} from "../../../../core/booking";

@Component({
  selector: 'app-customcalendar',
  templateUrl: './customcalendar.component.html',
  imports: [
    DatePipe,
    NgForOf,
    MatDatepickerModule,
    FormsModule,
    MatTabsModule,
    NgIf,
    MatButtonModule,
    MatIconModule
  ],
  standalone: true
})
export class CustomcalendarComponent implements OnInit {

  @Input() configuration: CustomerFormData;

  ngOnInit(): void {
    console.log('Customer Form Data in CustomcalendarComponent:', this.configuration);
    this.currentDate = new Date();
    this.calendar = new Calendar(
        this.currentDate.getMonth(),
        this.currentDate.getFullYear(),
        this.configuration);
  }

  currentDate: Date;
  calendar: Calendar;

  selectedTabIndex = 0;
  selectedDate: { day: number, month: number, year: number };

  selectDay(selectedDay: number) {
    // Set the selected date
    this.selectedDate = {
      day: selectedDay,
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear()
    };

    this.goToTab(1);
  }

  isSelected(selectedDay: number): boolean {
    return (
        this.selectedDate &&
        selectedDay === this.selectedDate.day &&
        this.currentDate?.getMonth() === this.selectedDate.month &&
        this.currentDate?.getFullYear() === this.selectedDate.year
    );
  }

  goToTab(index: number) {
    this.selectedTabIndex = index;
  }

  getMonthByMonthNumber(monthnum: number): string{

    switch (monthnum) {
      case 0:
        return 'Gennaio';
      case 1:
        return 'Febbraio';
      case 2:
        return 'Marzo';
      case 3:
        return 'Aprile';
      case 4:
        return 'Maggio';
      case 5:
        return 'Giugno';
      case 6:
        return 'Luglio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Settembre';
      case 9:
        return 'Ottobre';
      case 10:
        return 'Novembre';
      case 11:
        return 'Dicembre';
      default:
        return ''; // Handle invalid month numbers as needed
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.calendar.currentMonth = this.currentDate.getMonth();
    this.calendar.currentYear = this.currentDate.getFullYear();
    this.calendar.initializeDaysInMonth();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.calendar.currentMonth = this.currentDate.getMonth();
    this.calendar.currentYear = this.currentDate.getFullYear();
    this.calendar.initializeDaysInMonth();
  }
}

class Calendar {
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  daysInMonth: DayInfo[] = [];
  currentMonth: number;
  currentYear: number;

  customerFormData: CustomerFormData;

  constructor(month: number, year: number, configuration: CustomerFormData) {
    this.currentMonth = month;
    this.currentYear = year;
    this.customerFormData = configuration;
    this.initializeDaysInMonth();
  }

  initializeDaysInMonth(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    let startingDayIndex = firstDayOfMonth.getDay() - 1;

    if (startingDayIndex === -1) {
      startingDayIndex = 6;
    }

    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: daysInMonth + startingDayIndex }, (_, i) => {
      const dayValue = i - startingDayIndex + 1;

      let dayOfWeek = new Date(this.currentYear, this.currentMonth, dayValue).getDay();

      const isOpen = this.isDayOfWeekClosed(dayOfWeek, this.customerFormData?.branchTimeRangeDTOS);

      // const isOpen = false;
      return new DayInfo(dayValue, isOpen);
    });
  }


  isDayOfWeekClosed(dayOfWeek: number, timeRanges: BranchTimeRangeDTO[]): boolean {
    const dayOfWeekMapping: { [key: number]: BranchTimeRangeDTO.DayOfWeekEnum } = {
      0: 'DOMENICA',
      1: 'LUNEDI',
      2: 'MARTEDI',
      3: 'MERCOLEDI',
      4: 'GIOVEDI',
      5: 'VENERDI',
      6: 'SABATO'
    };

    const dayOfWeekEnum = dayOfWeekMapping[dayOfWeek];
    const matchingTimeRange = timeRanges.find(range => range.dayOfWeek === dayOfWeekEnum);

    return matchingTimeRange ? matchingTimeRange.closed : true;
  }

}

class DayInfo {
  value: number;
  isOpen: boolean;

  constructor(value: number, isOpen: boolean) {
    this.value = value;
    this.isOpen = isOpen;
  }
}

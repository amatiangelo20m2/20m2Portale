import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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
  ngOnInit(): void {

    this.currentDate = new Date();
    this.calendar = new Calendar(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }

  currentDate: Date;
  calendar: Calendar;

  selectedTabIndex = 0;
  selectedDate: any;

  selectDay(selectedDay: number) {
    // Set the selected date
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), selectedDay);
    console.log("selected " + this.selectedDate);
  }

  isSelected(selectedDay: number): boolean {
    return this.selectedDate && selectedDay === this.selectedDate.getDate();
  }

  showComponent(index: number) {
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
  daysInMonth: number[] = [];
  currentMonth: number;
  currentYear: number;

  constructor(month: number, year: number) {
    this.currentMonth = month;
    this.currentYear = year;
    this.initializeDaysInMonth();
  }

  initializeDaysInMonth(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    let startingDayIndex = firstDayOfMonth.getDay() - 1; // Adjust for Sunday being 0

    // If the result is -1 (Sunday), set it to 6 (Saturday)
    if (startingDayIndex === -1) {
      startingDayIndex = 6;
    }

    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth + startingDayIndex }, (_, i) => i - startingDayIndex + 1);
  }

}

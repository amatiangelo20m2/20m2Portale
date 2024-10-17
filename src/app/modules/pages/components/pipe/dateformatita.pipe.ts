import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from "luxon";

@Pipe({
  name: 'dateformatita',
    standalone: true
})
export class DateformatitaPipe implements PipeTransform {

    transform(date: DateTime): string {
        if (!date) return '';

        if (!date.isValid) {
            return ''; // return empty if the date is invalid
        }

        const daysOfWeek = [
            'DOMENICA', 'LUNEDÌ', 'MARTEDÌ', 'MERCOLEDÌ',
            'GIOVEDÌ', 'VENERDÌ', 'SABATO'
        ];

        const months = [
            'GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE',
            'MAGGIO', 'GIUGNO', 'LUGLIO', 'AGOSTO',
            'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'
        ];

        const dayOfWeek = daysOfWeek[date.weekday - 1]; // Luxon weekday is 1-based
        const dayNumber = date.day; // Day of the month
        const monthName = months[date.month - 1]; // Month name
        const year = date.year; // Year

        return `${dayOfWeek} ${dayNumber} ${monthName} ${year}`;
    }
}

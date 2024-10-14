import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformatita',
    standalone: true
})
export class DateformatitaPipe implements PipeTransform {

    transform(value: Date | string): string {
        if (!value) return '';

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return ''; // return empty if date is invalid
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

        const dayOfWeek = daysOfWeek[date.getDay()]; // Get the day of the week
        const dayNumber = date.getDate(); // Get the day of the month
        const monthName = months[date.getMonth()]; // Get the month name
        const year = date.getFullYear(); // Get the year

        return `${dayOfWeek} ${dayNumber} ${monthName} ${year}`;
    }
}

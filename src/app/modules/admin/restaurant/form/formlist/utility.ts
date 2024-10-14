import {environment} from "../../../../../../environments/environment";

export class UtilityForm{
    static getFormUrl(formCode: string) {
        return environment.formUrl + '/bfrm?form=' +  formCode;
    }

    static getIframeUrl(formCode: string) {
        return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                    <iframe src="${this.getFormUrl(formCode)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>`;
    }

    days: string[] = [
        'Lunedi',
        'Martedi',
        'Mercoldi',
        'Giovedi',
        'Venerdi',
        'Sabato',
        'Domenica'
    ];


    static generateTimeSlots(): string[] {
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

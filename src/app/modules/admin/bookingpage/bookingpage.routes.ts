import {Routes} from '@angular/router';
import {inject} from "@angular/core";
import {BookingPageComponent} from "./booking-page.component";
import {BookingpageproividerService} from "./bookingpageproivider.service";

export default [
    {
        path     : '',
        component: BookingPageComponent,
        resolve  : {
            data: () => inject(BookingpageproividerService).getBookingData(),
        },
    },
] as Routes;

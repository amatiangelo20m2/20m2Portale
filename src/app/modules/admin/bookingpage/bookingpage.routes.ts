import {Routes} from '@angular/router';
import {inject} from "@angular/core";
import {BookingPageComponent} from "./booking-page.component";
import {DataproviderService} from "../dataprovider.service";

export default [
    {
        path     : '',
        component: BookingPageComponent,
        resolve  : {
            data: () => inject(DataproviderService).getBookingData(),
        },
    },
] as Routes;

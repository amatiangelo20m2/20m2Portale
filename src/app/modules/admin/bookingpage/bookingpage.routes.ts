import {Routes} from '@angular/router';
import {inject} from "@angular/core";
import {BookingPageComponent} from "./booking-page.component";
import {StateManagerProvider} from "../../../state_manager/state-manager-provider.service";

export default [
    {
        path     : '',
        component: BookingPageComponent,
        resolve  : {
            data: () => inject(StateManagerProvider).getBookingData(),
        },
    },
] as Routes;

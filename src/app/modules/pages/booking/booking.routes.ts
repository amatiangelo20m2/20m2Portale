import {Routes} from "@angular/router";
import {BookingComponent} from "./booking.component";

export default [
    {
        path     : '',
        component: BookingComponent,
        resolve  : {
        },
    },
] as Routes;

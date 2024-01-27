import {Routes} from "@angular/router";
import {BookingComponent} from "./booking.component";
import {inject} from "@angular/core";
import {DataproviderService} from "../../admin/dashboard/dataprovider.service";

export default [
    {
        path     : '',
        component: BookingComponent,
        resolve  : {
            data: () => inject(DataproviderService).getDashData(),
        },
    },
] as Routes;

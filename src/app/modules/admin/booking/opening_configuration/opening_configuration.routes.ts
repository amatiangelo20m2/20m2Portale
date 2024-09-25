import {Routes} from '@angular/router';
import {inject} from "@angular/core";
import {OpeningConfigurationComponent} from "./opening-configuration.component";


export default [
    {
        path     : '',
        component: OpeningConfigurationComponent,
        resolve  : {
            // data: () => inject(StateManagerProvider).getBookingData(),
        },
    },
] as Routes;

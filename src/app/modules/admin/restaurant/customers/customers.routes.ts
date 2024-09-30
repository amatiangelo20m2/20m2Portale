import {Routes} from '@angular/router';
import {CustomersComponent} from "./customers.component";


export default [
    {
        path     : '',
        component: CustomersComponent,
        resolve  : {
            // data: () => inject(StateManagerProvider).getBookingData(),
        },
    },
] as Routes;

import {Routes} from '@angular/router';
import {inject} from "@angular/core";
import {StateManagerProvider} from "../../../../../state_manager/state-manager-provider.service";
import {RestaurantStateManagerProvider} from "../../../../../state_manager/restaurant-state-manager";
import {FormlistComponent} from "./formlist.component";

export default [
    {
        path     : '',
        component: FormlistComponent,
        resolve  : {
            data: () => inject(StateManagerProvider).getDashboardData(),
            dataForm: () => inject(RestaurantStateManagerProvider).retrieveFormByBranchCode(),
        },
    },
] as Routes;

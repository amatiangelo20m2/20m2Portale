import {Routes} from '@angular/router';
import {FormsComponent} from "./forms.component";
import {inject} from "@angular/core";
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";
import {RestaurantStateManagerProvider} from "../../../../state_manager/restaurant-state-manager";

export default [
    {
        path     : '',
        component: FormsComponent,
        resolve  : {
            data: () => inject(StateManagerProvider).getDashData(),
            dataForm: () => inject(RestaurantStateManagerProvider).retrieveFormByBranchCode(),
        },
    },
] as Routes;

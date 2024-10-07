import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {inject} from "@angular/core";
import {StateManagerProvider} from "../../../state_manager/state-manager-provider.service";

export default [
    {
        path     : '',
        component: DashboardComponent,
        resolve  : {
            data: () => inject(StateManagerProvider).getDashboardData(),
        },
    },
] as Routes;

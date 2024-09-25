import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {inject} from "@angular/core";
import {DataproviderService} from "../../../state_manager/dataprovider.service";

export default [
    {
        path     : '',
        component: DashboardComponent,
        resolve  : {
            data: () => inject(DataproviderService).getDashData(),
        },
    },
] as Routes;

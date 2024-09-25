import {Routes} from '@angular/router';
import {FormsComponent} from "./forms.component";
import {inject} from "@angular/core";
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";

export default [
    {
        path     : '',
        component: FormsComponent,
        resolve  : {
            data: () => inject(StateManagerProvider).retrieveFormByBranchCode(),
        },
    },
] as Routes;

import {Routes} from '@angular/router';
import {TagComponent} from "./tag.component";

export default [
    {
        path     : '',
        component: TagComponent,
        resolve  : {
            // data: () => inject(StateManagerProvider).getDashData(),
            // dataForm: () => inject(RestaurantStateManagerProvider).retrieveFormByBranchCode(),
        },
    },
] as Routes;

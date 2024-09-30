import {Routes} from "@angular/router";
import {FormComponent} from "./form.component";

export default [
    {
        path     : '',
        component: FormComponent,
        resolve  : {
        },
    },
] as Routes;

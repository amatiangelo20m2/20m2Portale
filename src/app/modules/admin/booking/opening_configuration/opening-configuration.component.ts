import {Component} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
    selector: 'app-opening-configuration',
    templateUrl: './opening-configuration.component.html',
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: {showError: true},
        },
    ],
    imports: [
    ],
    standalone: true
})
export class OpeningConfigurationComponent {

}

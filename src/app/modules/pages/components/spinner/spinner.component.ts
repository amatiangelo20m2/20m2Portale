import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    imports: [
        NgIf
    ],
    standalone: true
})
export class SpinnerComponent {

    @Input() visible : boolean;
    @Input() description : string;
}

import {Component, Input, OnInit} from '@angular/core';
import {FormDTO} from "../../../../../../../core/restaurant_service";

@Component({
    selector: 'app-tablehoursconf',
    templateUrl: './tablehoursconf.component.html',
    standalone: true
})
export class TablehoursconfComponent implements OnInit {

    @Input() form: FormDTO;

    ngOnInit(): void {

    }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";
import {FormDTO} from "../../../../core/restaurant_service";

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    standalone: true
})
export class FormsComponent implements OnInit, OnDestroy{

    forms : FormDTO[] = [];

    constructor(private _stateManagerProvider : StateManagerProvider) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this._stateManagerProvider.formDtos$.subscribe(value => {
            this.forms = value;
        });
    }


}

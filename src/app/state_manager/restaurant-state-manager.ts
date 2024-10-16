import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {FormControllerService, FormDTO} from "../core/restaurant_service";

@Injectable({providedIn: 'root'})
export class RestaurantStateManagerProvider {

    constructor(private _formController : FormControllerService) {
    }

    private currentFormList : BehaviorSubject<FormDTO[]> = new BehaviorSubject(null);
    formDtos$ = this.currentFormList.asObservable();
    retrieveFormByBranchCode() {

        let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';

        console.log("Retrieve form for branch with code " + branchCodeRetrieved);
        this._formController
            .retrieveByBranchCode(branchCodeRetrieved)
            .subscribe(formList => {
                console.log('Form retrieved: ' + formList.toString());
                this.currentFormList.next(formList);
            });
    }
}

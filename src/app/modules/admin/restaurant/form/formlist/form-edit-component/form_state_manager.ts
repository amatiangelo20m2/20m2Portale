import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {FormControllerService, FormDTO, TimeRange} from "../../../../../../core/restaurant_service";

@Injectable({providedIn: 'root'})
export class FormStateManager {


    private currentForm: BehaviorSubject<FormDTO> = new BehaviorSubject(null);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    formDTO$ = this.currentForm.asObservable();

    formDto : FormDTO;

    constructor(private _formControllerService : FormControllerService) {

    }

    retrieveFormByCode(formCode: string){
        this._formControllerService
            .retrieveByFormCode(formCode, 'body')
            .subscribe(value => {
                this.currentForm.next(value);
            });
    }

    // /**
    //  *  this map will keep track about changes on the hours list and than will be used to send the modify request
    //  */
    // private timeSlotMap: BehaviorSubject<Map<string, TimeRange>> = new BehaviorSubject(null);
    // timeSlotMap$ = this.timeSlotMap.asObservable();
    //
    //
    // updateTimeSlotIntoMap(timeRangeCode: string, timeRange: TimeRange) {
    //     this.timeSlotMap.value.set(timeRangeCode, timeRange);
    // }
    //
    // clearMap() {
    //     this.timeSlotMap.value.clear();
    // }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {UserService} from "../../../core/user/user.service";
import {User} from "../../../core/user/user.types";
import {BranchResponseEntity, DashboardControllerService} from "../../../core/dashboard";
import {
    BookingControllerService,
    BranchConfigurationDTO, BranchGeneralConfigurationEditRequest,
    BranchTimeRangeDTO, FormTag,
    TimeRangeUpdateRequest
} from "../../../core/booking";

@Injectable({providedIn: 'root'})
export class DataproviderService {

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private currentBranch: BehaviorSubject<BranchResponseEntity> = new BehaviorSubject(null);
    private currentBranchesList : BehaviorSubject<BranchResponseEntity[]> = new BehaviorSubject(null);

    private currentBranchConfiguration : BehaviorSubject<BranchConfigurationDTO> = new BehaviorSubject(null);


    branch$ = this.currentBranch.asObservable();
    branches$ = this.currentBranchesList.asObservable();

    branchConfiguration$ = this.currentBranchConfiguration.asObservable();

    user : User;

    constructor(
        private _dashboardControllerService: DashboardControllerService,
        private _bookingControllerService: BookingControllerService,
        private _userService: UserService) {
    }

    getDashData(){
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {

                this.user = user;
                this._userService.user$.pipe(
                    (takeUntil(this._unsubscribeAll)))
                    .subscribe((user: User) => {

                        console.log("Retrieve branches with code : " + user.userCode)

                        this._dashboardControllerService?.retrieveDashboardData(user?.userCode).subscribe(
                            value => {
                                this.currentBranchesList?.next(value.branches);

                                if(this.currentBranchesList?.value){

                                    let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';

                                    if(branchCodeRetrieved == ''){
                                        this.selectBranch(value[0]);

                                    }else{
                                        this.selectBranch(
                                            this.currentBranchesList.value
                                                .find(branch =>
                                                    branch?.branchCode === branchCodeRetrieved) ?? value[0]
                                        );


                                    }
                                }
                            }
                        );
                    });
            });
    }
    selectBranch(branch: BranchResponseEntity) {
        localStorage.setItem('branchCode', branch?.branchCode ?? '');
        this.currentBranch.next(branch);
        this.retrieveBookingConfiguration(branch?.branchCode);
    }
    addBranch(branch: BranchResponseEntity) {

        this.currentBranchesList.value.push(branch);
        if(this.currentBranchesList.value.length == 1){
            this.selectBranch(this.currentBranchesList.value[0]);
        }
        this.currentBranchesList.next(this.currentBranchesList.value);
    }
    retrieveBookingConfiguration(branchCode: string){
        this._bookingControllerService.checkWaApiStatus(branchCode)
            .subscribe((bookingConfDTO) =>{
                this.currentBranchConfiguration?.next(bookingConfDTO);
            });
    }

    branchTimeRangeDTO : BehaviorSubject<BranchTimeRangeDTO> = new BehaviorSubject(null);
    branchTimeRangeDTO$ = this.branchTimeRangeDTO.asObservable();

    setBranchTimeRangeDTOToUpdate(branchTimeRangeDTO1: BranchTimeRangeDTO) {
        this.branchTimeRangeDTO.next(branchTimeRangeDTO1);
    }
    ids : number[] = [];
    fromCurrentTimeRangeListRetrieveIdsByDaysSelected(selectedDays: string[]) {
        this.ids = [];
        this.branchConfiguration$.subscribe((restaurantConfig)=>{
            selectedDays.forEach((day)=>{
                this.ids.push(restaurantConfig?.bookingFormList?.at(0).branchTimeRanges.find((branchTimeRange)=>
                    branchTimeRange.dayOfWeek == this.getDayFromSelectedDay(day)
                ).id);
            });
        });

        return this.ids;
    }
    private getDayFromSelectedDay(selectedDay: string) {

        const enumValues: string[] = Object.values(BranchTimeRangeDTO.DayOfWeekEnum);

        if (enumValues.includes(selectedDay)) {
            return selectedDay as BranchTimeRangeDTO.DayOfWeekEnum;
        }

        return undefined;
    }
    public updateTimeRange(param: { branchCode: string; timeRanges: Array<TimeRangeUpdateRequest>; listConfIds: number[] }) {
        this._bookingControllerService.updateTimeRange(param).subscribe((restaurantConf)=>{
            this.currentBranchConfiguration.next(restaurantConf);
        });
    }
    public updateBranchBookingConfigration(branchGeneralConfigurationEditRequest :
                                               BranchGeneralConfigurationEditRequest): boolean{

        this._bookingControllerService.updateConfiguration(
            branchGeneralConfigurationEditRequest
        ).subscribe((branchResDTO)=>{
            this.currentBranchConfiguration.next(branchResDTO);
            return true;
        });
        return false;
    }

    // createTag(tag: FormTag, branchCode: string): FormTag {
    //
    // }
    createTag(tag: FormTag, branchCode: string) {
        // this._bookingControllerService.createTag(tag.title, branchCode)
        //     .subscribe((tag: FormTag)=>{
        //         this.currentBranchConfiguration.value.tags.push(tag);
        //     }
        // )
    }

    deleteTag(tag: FormTag, branchCode: string) {
        // this._bookingControllerService.deleteTag(tag.title, branchCode)
        //     .subscribe(()=>{
        //             console.log("tag deleted with id " , tag.id);
        //             this.currentBranchConfiguration.value?.tags?.filter(tag => tag.id !== tag.id);
        //         }
        //     );
    }

    switchClosedStatus(timeRangeDTO: BranchTimeRangeDTO,
                       formCode: string) {
        this._bookingControllerService.switchisclosedbranchtime(timeRangeDTO.id).subscribe((response)=>{

                console.log("changinfasdasdasdsad ")
                this.currentBranchConfiguration
                    .value
                    .bookingFormList
                    .find(form =>
                        form.formCode === formCode)
                    .branchTimeRanges
                    .find(branchTimeRangeDTO => branchTimeRangeDTO.id === timeRangeDTO.id).closed = !timeRangeDTO.closed;

        });
    }
}

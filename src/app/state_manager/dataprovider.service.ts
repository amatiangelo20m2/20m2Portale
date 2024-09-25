import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {UserService} from "../core/user/user.service";
import {User} from "../core/user/user.types";
import {BranchControllerService, BranchResponseEntity} from "../core/dashboard";

@Injectable({providedIn: 'root'})
export class DataproviderService {

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private currentBranch: BehaviorSubject<BranchResponseEntity> = new BehaviorSubject(null);
    private currentBranchesList : BehaviorSubject<BranchResponseEntity[]> = new BehaviorSubject(null);
    // private currentBranchConfiguration : BehaviorSubject<BranchConfigurationDTO> = new BehaviorSubject(null);

    branch$ = this.currentBranch.asObservable();
    branches$ = this.currentBranchesList.asObservable();

    // branchConfiguration$ = this.currentBranchConfiguration.asObservable();

    user : User;

    constructor(
        private _branchControllerService: BranchControllerService,
        // private _bookingControllerService: BookingControllerService,
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
                        console.log("Retrieve branches for user with code : " + user.userCode)

                        this._branchControllerService?.retrieveData(user?.userCode, '').subscribe(
                            value => {

                                if(value.branches?.length != 0){
                                    this.currentBranchesList?.next(value.branches);
                                    if(this.currentBranchesList?.value){
                                        console.log(this.currentBranchesList)
                                        let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';

                                        if(branchCodeRetrieved == ''){
                                            this.selectBranch(value.branches[0]);
                                        }else{
                                            this.selectBranch(
                                                this.currentBranchesList.value
                                                    .find(branch =>
                                                        branch?.branchCode === branchCodeRetrieved) ?? value[0]
                                            );
                                        }
                                    }
                                }else{
                                    this.currentBranchesList?.next([]);
                                }
                            }
                        );
                    });
            });
    }
    selectBranch(branch: BranchResponseEntity) {
        localStorage.setItem('branchCode', branch?.branchCode ?? '');
        this.currentBranch.next(branch);
        // this.retrieveBookingConfiguration(branch?.branchCode);
    }


    addBranch(branch: BranchResponseEntity) {

        this.currentBranchesList.value.push(branch);
        if(this.currentBranchesList.value.length == 1){
            this.selectBranch(this.currentBranchesList.value[0]);
        }
        this.currentBranchesList.next(this.currentBranchesList.value);
    }


    // retrieveBookingConfiguration(branchCode: string){
    //     this._bookingControllerService.checkWaApiStatus(branchCode)
    //         .subscribe((bookingConfDTO) =>{
    //             this.currentBranchConfiguration?.next(bookingConfDTO);
    //         });
    // }

    // branchTimeRangeDTO : BehaviorSubject<BranchTimeRangeDTO> = new BehaviorSubject(null);
    // branchTimeRangeDTO$ = this.branchTimeRangeDTO.asObservable();
    //
    // setBranchTimeRangeDTOToUpdate(branchTimeRangeDTO1: BranchTimeRangeDTO) {
    //     this.branchTimeRangeDTO.next(branchTimeRangeDTO1);
    // }
    // ids : number[] = [];
    // fromCurrentTimeRangeListRetrieveIdsByDaysSelected(selectedDays: string[]) {
    //     this.ids = [];
    //     this.branchConfiguration$.subscribe((restaurantConfig)=>{
    //         selectedDays.forEach((day)=>{
    //             this.ids.push(restaurantConfig?.bookingFormList?.at(0).branchTimeRanges.find((branchTimeRange)=>
    //                 branchTimeRange.dayOfWeek == this.getDayFromSelectedDay(day)
    //             ).id);
    //         });
    //     });
    //
    //     return this.ids;
    // }
    // private getDayFromSelectedDay(selectedDay: string) {
    //
    //     const enumValues: string[] = Object.values(BranchTimeRangeDTO.DayOfWeekEnum);
    //
    //     if (enumValues.includes(selectedDay)) {
    //         return selectedDay as BranchTimeRangeDTO.DayOfWeekEnum;
    //     }
    //
    //     return undefined;
    // }
    // public updateTimeRange(param: { branchCode: string; timeRanges: Array<TimeRangeUpdateRequest>; listConfIds: number[] }) {
    //     this._bookingControllerService.updateTimeRange(param).subscribe((restaurantConf)=>{
    //         this.currentBranchConfiguration.next(restaurantConf);
    //     });
    // }
    // public updateBranchBookingConfigration(branchGeneralConfigurationEditRequest :
    //                                            BranchGeneralConfigurationEditRequest): boolean{
    //
    //     this._bookingControllerService.updateConfiguration(
    //         branchGeneralConfigurationEditRequest
    //     ).subscribe((branchResDTO)=>{
    //         this.currentBranchConfiguration.next(branchResDTO);
    //         return true;
    //     });
    //     return false;
    // }
    //
    // // createTag(tag: FormTag, branchCode: string): FormTag {
    // //
    // // }
    // createTag(tag: FormTag, branchCode: string) {
    //     // this._bookingControllerService.createTag(tag.title, branchCode)
    //     //     .subscribe((tag: FormTag)=>{
    //     //         this.currentBranchConfiguration.value.tags.push(tag);
    //     //     }
    //     // )
    // }
    //
    // deleteTag(tag: FormTag, branchCode: string) {
    //     // this._bookingControllerService.deleteTag(tag.title, branchCode)
    //     //     .subscribe(()=>{
    //     //             console.log("tag deleted with id " , tag.id);
    //     //             this.currentBranchConfiguration.value?.tags?.filter(tag => tag.id !== tag.id);
    //     //         }
    //     //     );
    // }
    //
    // switchClosedStatus(timeRangeDTO: BranchTimeRangeDTO,
    //                    formCode: string) {
    //     this._bookingControllerService.switchIsClosedBranchTime(timeRangeDTO.id).subscribe((response)=>{
    //
    //             this.currentBranchConfiguration
    //                 .value
    //                 .bookingFormList
    //                 .find(form =>
    //                     form.formCode === formCode)
    //                 .branchTimeRanges
    //                 .find(branchTimeRangeDTO => branchTimeRangeDTO.id === timeRangeDTO.id).closed = !timeRangeDTO.closed;
    //
    //     });
    // }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // //booking page service
    //
    // private _bookings: BehaviorSubject<BookingDTO[] | null> = new BehaviorSubject(null);
    // private _originalBookings: BookingDTO[] = [];
    //
    getBookingData() {
        this.getDashData();
        let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';
        // if(branchCodeRetrieved != '') {
        //     this._bookingControllerService.retrieveBookingsByBranchCode(branchCodeRetrieved, '2024-02-02','').subscribe(
        //         (retrievedBooking: BookingDTO[])=>{
        //             this._originalBookings = this.sortBookingsByCustomerName(retrievedBooking);
        //             this._bookings.next(this.sortBookingsByCustomerName(retrievedBooking));
        //         }
        //     );
        // }
    }
    //
    // sortBookingsByCustomerName(bookings: BookingDTO[]): BookingDTO[] {
    //     return bookings.sort((a, b) => {
    //         const nameA = a.customer.name.toLowerCase();
    //         const nameB = b.customer.name.toLowerCase();
    //         if (nameA < nameB) {
    //             return -1;
    //         }
    //         if (nameA > nameB) {
    //             return 1;
    //         }
    //         return 0;
    //     });
    // }
    //
    // get bookings$(): Observable<BookingDTO[]> {
    //     return this._bookings.asObservable();
    // }
    //
    // searchInputControl(query: string): Observable<BookingDTO[]> {
    //     const filteredBookings = this._originalBookings.filter(booking =>
    //         booking.customer.name.toLowerCase().includes(query.toLowerCase())
    //     );
    //     this._bookings.next(filteredBookings);
    //     return of();
    // }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {UserService} from "../../../core/user/user.service";
import {User} from "../../../core/user/user.types";
import {BranchResponseEntity, DashboardControllerService} from "../../../core/dashboard";

@Injectable({providedIn: 'root'})
export class DataproviderService {

    private _unsubscribeAll: Subject<any> = new Subject<any>();


    private currentBranch: BehaviorSubject<BranchResponseEntity> = new BehaviorSubject(null);
    private currentBranchesList : BehaviorSubject<BranchResponseEntity[]> = new BehaviorSubject(null);

    branch$ = this.currentBranch.asObservable();
    branches$ = this.currentBranchesList.asObservable();

    user : User;

    constructor(
        private _dashboardControllerService: DashboardControllerService,
        private _userService: UserService,) {
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

                        this._dashboardControllerService.retrieveDashboardData(user.userCode).subscribe(
                            value => {
                                this.currentBranchesList.next(value.branches);

                                if(this.currentBranchesList.value){

                                    let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';

                                    if(branchCodeRetrieved == ''){
                                        this.selectBranch(value[0]);
                                    }else{
                                        this.selectBranch(
                                            this.currentBranchesList.value.find(branch => branch.branchCode === branchCodeRetrieved) ?? value[0]
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
    }
    addBranch(branch: BranchResponseEntity) {

        this.currentBranchesList.value.push(branch);

        if(this.currentBranchesList.value.length == 1){
            this.selectBranch(this.currentBranchesList.value[0]);
        }

        this.currentBranchesList.next(this.currentBranchesList.value);

    }

}

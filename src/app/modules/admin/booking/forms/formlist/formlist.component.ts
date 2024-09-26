import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BehaviorSubject, catchError, combineLatest, Subject, takeUntil, throwError} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StateManagerProvider} from "../../../../../state_manager/state-manager-provider.service";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {DatePipe, I18nPluralPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import FormStatusEnum = FormDTO.FormStatusEnum;
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormpipePipe} from "./formpipe.pipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControllerService, FormDTO} from "../../../../../core/restaurant_service";

@Component({
    selector: 'app-formlist',
    templateUrl: './formlist.component.html',
    imports: [
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        I18nPluralPipe,
        RouterLink,
        MatButtonModule,
        NgForOf,
        MatProgressBarModule,
        NgClass,
        NgIf,
        DatePipe,
        FormsModule,
        MatDatepickerModule,
        MatMenuModule,
        MatSidenavModule,
        FormpipePipe
    ],
    standalone: true
})
export class FormlistComponent implements OnInit, OnDestroy {

    @Input() tooltip: string;

    forms: FormDTO[];

    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
        categorySlug$: new BehaviorSubject('all'),
        query$: new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(false),
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public choosedStatus: FormStatusEnum;
    branchName: string;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _stateManagerProvider : StateManagerProvider,
        private _snackBar: MatSnackBar,
        private _formController : FormControllerService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._stateManagerProvider.branch$.subscribe(value => {
            this.branchName = value.name;
        });
        // Get the categories
        this._stateManagerProvider.formDtos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((formDTOS: FormDTO[]) => {
                this.forms = formDTOS;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    formStatus: FormStatusEnum[] = Object.values(FormStatusEnum);

    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByStatus(change: MatSelectChange): void {
        console.log(change.value!);
        if(change.value! == 'TUTTI'){
            this.choosedStatus = null;
        }else{
            this.choosedStatus = change.value;
        }

    }

    /**
     * Show/hide completed courses
     *
     * @param change
     */
    toggleCompleted(change: MatSlideToggleChange): void {
        this.filters.hideCompleted$.next(change.checked);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    protected readonly FormStatusEnum = FormStatusEnum;

    copyToClipboard(formCode: string) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = this.getFormUrl(formCode);
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy'); // Copy the text to the clipboard
        document.body.removeChild(textarea); // Remove the temporary element

        this._snackBar.open('Url copiato 😎', 'Undo', {
            duration: 3000,
        });
    }

    getFormUrl(formCode: string) {
        return 'https://form.vmq1.com/'+formCode;

    }

    getIframeUrl(formCode: string){
        return '<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">\n' +
            '    <iframe \n' +
            '        src='+ this.getFormUrl(formCode) + '\n' +
            '        frameborder="0" \n' +
            '        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">\n' +
            '    </iframe>\n' +
            '</div>\n';
    }
    updateRedirectPage(form: FormDTO): void {
        console.log('Updated Redirect Page for Form ID:', form.formId);
        console.log('New Redirect Page:', form.redirectPage);

        this._formController.editForm(form).pipe(
            catchError((error) => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000
                });
                return throwError(error);
            })
        ).subscribe(formDto => {
            this._snackBar.open('Redirect page aggiornata [' + formDto.redirectPage + ']', 'Undo', {
                duration: 3000,
            });
        });

    }

}


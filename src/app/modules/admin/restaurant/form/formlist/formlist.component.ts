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
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormpipePipe} from "./formpipe.pipe";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormcardComponent} from "./formcard/formcard.component";
import {FormDTO} from "../../../../../core/restaurant_service";
import FormStatusEnum = FormDTO.FormStatusEnum;
import {RestaurantStateManagerProvider} from "../../../../../state_manager/restaurant-state-manager";


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
        FormpipePipe,
        MatChipsModule,
        MatAutocompleteModule,
        FormcardComponent
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

    formStatus= Object.values(FormDTO.FormStatusEnum);

    public choosedStatus: FormDTO.FormStatusEnum;
    branchName: string;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _restaurantStateManagerProvider: RestaurantStateManagerProvider,
        private _stateManagerProvider: StateManagerProvider,
    ) {}

    ngOnInit(): void {
        this._stateManagerProvider.branch$.subscribe(value => {
            this.branchName = value.name;
        });

        this._restaurantStateManagerProvider.formDtos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((formDTOS: FormDTO[]) => {
                this.forms = formDTOS;
                this._changeDetectorRef.markForCheck();
            });

        this.choosedStatus = FormStatusEnum.ATTIVO;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    filterByStatus(change: MatSelectChange): void {
        this.choosedStatus = change.value === 'TUTTI' ? null : change.value;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    protected readonly FormStatusEnum = FormDTO.FormStatusEnum;


}


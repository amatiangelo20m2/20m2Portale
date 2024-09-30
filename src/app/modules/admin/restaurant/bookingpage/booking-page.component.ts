import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {DatePipe, I18nPluralPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";
import {BranchResponseEntity} from "../../../../core/dashboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
    selector: 'bookingpage',
    templateUrl: './booking-page.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [DatePipe],
    imports: [
        NgClass,
        RouterLink,
        NgIf,
        NgForOf,
        MatSidenavModule,
        RouterOutlet,
        I18nPluralPipe,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatGridListModule,
        MatMenuModule,
        MatListModule,
        MatDatepickerModule,
        FormsModule,
        DatePipe,
        MatSlideToggleModule
    ],
    standalone: true
})
export class BookingPageComponent implements OnInit{

    @Input() tooltip: string;
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    //
    // bookings: BookingDTO[];
    // selectedBooking: BookingDTO;
    drawerMode: 'side' | 'over';
    bookingCount: number = 0;
    selectedDate: Date = new Date();
    //
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    // private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentBranch: BranchResponseEntity;

    constructor(private _dataproviderService: StateManagerProvider,
                private _router: Router,
                private _changeDetectorRef: ChangeDetectorRef,
                private _activatedRoute: ActivatedRoute,
                private _snackBar: MatSnackBar,
                private _datePipe: DatePipe){
    }

    ngOnInit(): void {

        this._dataproviderService.branch$.subscribe((branch) => {
            this.currentBranch = branch;
        });

        //
        // this._dataproviderService.bookings$.subscribe((bookings) =>{
        //     this.bookings = bookings
        //     this.bookingCount = this.bookings?.length;
        //     this._changeDetectorRef.markForCheck();
        // });
        //
        // this.searchInputControl.valueChanges.pipe(
        //         takeUntil(this._unsubscribeAll),
        //         switchMap(query =>
        //             this._dataproviderService.searchInputControl(query),
        //         ),
        //     )
        //     .subscribe();
        //
        // this.matDrawer.openedChange.subscribe((opened) => {
        //     if ( !opened ) {
        //         this.selectedBooking = null;
        //         this._changeDetectorRef.markForCheck();
        //     }
        // });
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    createBooking() {
        console.log('Crea prenotazione');
    }

    changeMenuSort(name: string) {
        this._snackBar.open('Prenotazioni ordinate per ' + name , 'Undo', {
            duration: 3000,
        });
    }

    onDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.selectedDate = event.value;

        // Format the selected date to Italian format 'dd/MM/yyyy'
        const formattedDate = this._datePipe.transform(this.selectedDate, 'dd/MM/yyyy', 'it-IT');

        this._snackBar.open('Prenotazioni del ' + formattedDate, 'Undo', {
            duration: 3000,
        });
    }

    openModal() {

    }
}

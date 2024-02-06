import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {BookingpageproividerService} from "./bookingpageproivider.service";
import {BookingDTO} from "../../../core/booking";
import {async, Observable, Subject, switchMap, takeUntil} from "rxjs";
import {AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass, NgFor, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
@Component({
    selector: 'bookingpage',
    templateUrl: './booking-page.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
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
        MatButtonModule
    ],
    standalone: true
})
export class BookingPageComponent implements OnInit{

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    bookings: BookingDTO[];
    selectedBooking: BookingDTO;
    drawerMode: 'side' | 'over';
    bookingCount: number = 0;
    searchInputControl: UntypedFormControl = new UntypedFormControl();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _bookingProvider: BookingpageproividerService,
                private _router: Router,
                private _changeDetectorRef: ChangeDetectorRef,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._bookingProvider.bookings$.subscribe((bookings) =>{
            this.bookings = bookings
            this.bookingCount = this.bookings?.length;
            this._changeDetectorRef.markForCheck();
        });

        this.searchInputControl.valueChanges.pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(query =>
                    this._bookingProvider.searchInputControl(query),
                ),
            )
            .subscribe();

        this.matDrawer.openedChange.subscribe((opened) => {
            if ( !opened ) {
                this.selectedBooking = null;
                this._changeDetectorRef.markForCheck();
            }
        });
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

    }
}

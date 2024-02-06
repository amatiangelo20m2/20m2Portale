import {Injectable} from "@angular/core";
import {BookingControllerService, BookingDTO} from "../../../core/booking";
import {BehaviorSubject, map, Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class BookingpageproividerService {

    private _bookings: BehaviorSubject<BookingDTO[] | null> = new BehaviorSubject(null);
    private _originalBookings: BookingDTO[] = [];
    constructor(private _bookingController : BookingControllerService) {
    }

    getBookingData() {

        let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';
        if(branchCodeRetrieved != '') {
            this._bookingController.retrieveBookingsByBranchCode(branchCodeRetrieved, '2024-02-02','').subscribe(
                (retrievedBooking: BookingDTO[])=>{
                    this._originalBookings = retrievedBooking;
                    this._bookings.next(retrievedBooking);
                }
            );
        }
    }


    get bookings$(): Observable<BookingDTO[]> {
        return this._bookings.asObservable();
    }


    searchInputControl(query: string): Observable<BookingDTO[]> {
        const filteredBookings = this._originalBookings.filter(booking =>
            booking.customer.name.toLowerCase().includes(query.toLowerCase())
        );
        this._bookings.next(filteredBookings);
        return of();
    }
}

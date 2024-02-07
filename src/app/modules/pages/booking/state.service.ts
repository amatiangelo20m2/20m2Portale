import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    currentStateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('GETNUMBER');

    constructor() { }

    setState(newState: string): void {
        this.currentStateSubject.next(newState);
    }

    getState(): Observable<string> {
        return this.currentStateSubject.asObservable();
    }
}

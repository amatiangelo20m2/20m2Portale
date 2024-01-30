import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import Swal from 'sweetalert2';
import {CodeInputModule} from "angular-code-input";

@Component({
    selector: 'app-opt-code-dialog',
    templateUrl: 'optconfirm.component.html',
    imports: [
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        CodeInputModule
    ],
    standalone: true
})
export class OptCodeDialogComponent implements OnInit {

    @Output() dialogResult = new EventEmitter<boolean>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<OptCodeDialogComponent>,) {
        console.log('Received opt:  ' + this.data.otpValue)
    }

    ngOnInit(): void {
    }
    onCodeChanged($event: string) {

    }

    onCodeCompleted($event: string) {

        // Your code verification logic here
        const isCodeValid = this.data.otpValue === $event.toString();

        if (isCodeValid) {
            // Close the dialog with a true result
            Swal.fire({
                title: "Cellulare verificato",
                text: "",
                timer: 1500,
                showConfirmButton: false,
                icon: "success"
            });
            this.dialogResult.emit(true);
            this.dialogRef.close(true);
        } else {
            // Show an error or handle invalid code
            Swal.fire({
                title: "Codice non valido",
                text: "",
                timer: 1500,
                showConfirmButton: false,
                icon: "error"
            });
            this.dialogResult.emit(false);
            this.dialogRef.close(false);
        }
    }
}

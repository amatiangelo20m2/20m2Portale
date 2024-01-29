import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-opt-code-dialog',
    templateUrl: 'optconfirm.component.html',
    imports: [
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonModule
    ],
    standalone: true
})
export class OptCodeDialogComponent implements OnInit {
    optCode: string = '';

    constructor(
        public dialogRef: MatDialogRef<OptCodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {}

    onCancel(): void {
        this.dialogRef.close();
        Swal.fire({
            title: "Grazie",
            timer: 1500,
            showConfirmButton: false,
            text: "Cellulare verificato!",
            icon: "success"
        });
    }

    onSubmit(): void {
        this.dialogRef.close(this.optCode);
    }
}

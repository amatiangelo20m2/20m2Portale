import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {QRCodeModule} from "angularx-qrcode";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-qrcode',
    standalone: true,
    imports: [CommonModule, QRCodeModule, MatDialogModule, MatButtonModule],
    templateUrl: './q-r-code-component-modal.component.html',
})
export class QRCodeComponentModal {
    constructor(
        public dialogRef: MatDialogRef<QRCodeComponentModal>,
        @Inject(MAT_DIALOG_DATA) public data: { url: string }
    ) {}

    onClose(): void {
        this.dialogRef.close();
    }
}

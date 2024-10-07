import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import Swal from "sweetalert2";
import {CommunicationStateManagerProvider} from "../../../../../state_manager/communication-state-manager-provider";
import {NgIf} from "@angular/common";
import {
    WhatsAppConfigurationControllerService,
    WhatsAppConfigurationDTO
} from "../../../../../core/communication_service";

@Component({
    selector: 'app-whatsappsettings',
    templateUrl: './whatsappsettings.component.html',
    standalone: true,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, NgIf],
})
export class WhatsappsettingsComponent {
    private branchCode: string;
    public wsConf: WhatsAppConfigurationDTO;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _communicationStateManagerProvider: CommunicationStateManagerProvider,
        private _whatsappControllerService : WhatsAppConfigurationControllerService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';
        this.branchCode = branchCodeRetrieved;
        this._communicationStateManagerProvider.whatsAppConf$.subscribe(value => {
            this.wsConf = value;
            console.log("XXX:" + value.qrCode);
        });
    }

    configureMessagingWhatsapp() {
        let timerInterval;
        Swal.fire({
            icon: "warning",
            title: "CONFIGURAZIONI IN CORSO",
            html: "Attendi, sto configurando il numero <b></b>",  // Placeholder for the dots animation
            timerProgressBar: true,
            allowOutsideClick: false,  // Prevent closing by clicking outside
            allowEscapeKey: false,     // Prevent closing by pressing escape
            allowEnterKey: false,      // Prevent closing by pressing enter
            showConfirmButton: false,  // Hide the confirm button

            didOpen: () => {
                Swal.showLoading();
                const dotContainer = Swal.getPopup().querySelector("b");
                let dotCount = 0;

                // Interval to cycle through dots animation
                timerInterval = setInterval(() => {
                    dotCount = (dotCount % 3) + 1; // Cycle between 1, 2, 3 dots
                    dotContainer.textContent = ".".repeat(dotCount); // Update dot content
                }, 500); // Adjust the speed of the dots animation (500ms)
            },
            willClose: () => {
                clearInterval(timerInterval); // Clear the dots interval when Swal closes
            }
        });

        this._whatsappControllerService.createConfWaApi(this.branchCode).subscribe({
            next: (value) => {

                this._communicationStateManagerProvider.setCurrentWhatsAppConf(value);

                Swal.fire({
                    icon: "success",
                    title: "Completato",
                    text: "Numero configurato con successo!",
                    showConfirmButton: true,
                });
            },
            error: (err) => {
                // Handle the error and close Swal with an error message
                Swal.fire({
                    icon: "error",
                    title: "Errore",
                    text: err.toString(),
                    showConfirmButton: true,
                });
            },
            complete: () => {
                // Clear any remaining intervals, if necessary
                clearInterval(timerInterval);
            }
        });

    }

    retrieveQR() {
        let timerInterval;
        Swal.fire({
            icon: "warning",
            title: "Recupero qr code..",
            html: "Attendi, recuperando il qr <b></b>",  // Placeholder for the dots animation
            timerProgressBar: true,
            allowOutsideClick: false,  // Prevent closing by clicking outside
            allowEscapeKey: false,     // Prevent closing by pressing escape
            allowEnterKey: false,      // Prevent closing by pressing enter
            showConfirmButton: false,  // Hide the confirm button

            didOpen: () => {
                Swal.showLoading();
                const dotContainer = Swal.getPopup().querySelector("b");
                let dotCount = 0;

                // Interval to cycle through dots animation
                timerInterval = setInterval(() => {
                    dotCount = (dotCount % 3) + 1; // Cycle between 1, 2, 3 dots
                    dotContainer.textContent = ".".repeat(dotCount); // Update dot content
                }, 500); // Adjust the speed of the dots animation (500ms)
            },
            willClose: () => {
                clearInterval(timerInterval); // Clear the dots interval when Swal closes
            }
        });

        this._whatsappControllerService.retrieveQr(this.branchCode).subscribe({
            next: (value) => {
                this._communicationStateManagerProvider.setCurrentWhatsAppConf(value);
                Swal.fire({
                    icon: "success",
                    title: "Qr code trovato",
                    text: "E' una festa!",
                    showConfirmButton: true,
                });
            },
            error: (err) => {
                // Handle the error and close Swal with an error message
                Swal.fire({
                    icon: "error",
                    title: "Errore",
                    text: err.toString(),
                    showConfirmButton: true,
                });
            },
            complete: () => {
                // Clear any remaining intervals, if necessary
                clearInterval(timerInterval);
            }
        });
    }
}

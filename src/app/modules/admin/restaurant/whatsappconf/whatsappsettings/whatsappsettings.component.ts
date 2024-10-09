import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
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
import {interval, Subject, switchMap, takeWhile} from "rxjs";
import {MatTooltipModule} from "@angular/material/tooltip";
import WaApiStateEnum = WhatsAppConfigurationDTO.WaApiStateEnum;
import {
    WhatsAppConfigurationControllerService,
    WhatsAppConfigurationDTO
} from "../../../../../core/communication_service";

@Component({
    selector: 'app-whatsappsettings',
    templateUrl: './whatsappsettings.component.html',
    standalone: true,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, NgIf, MatTooltipModule],
})
export class WhatsappsettingsComponent implements OnInit, OnDestroy {

    @Input() tooltip: string;
    private branchCode: string;
    public wsConf: WhatsAppConfigurationDTO | null = null;
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    formTrySendMessageWhatsApp: UntypedFormGroup;

    private shouldContinueLoop: boolean = true;

    /**
     * Constructor
     */
    constructor(
        private _communicationStateManagerProvider: CommunicationStateManagerProvider,
        private _whatsappControllerService : WhatsAppConfigurationControllerService,
        private _whatsAppService : WhatsAppConfigurationControllerService,
        private _formBuilder: FormBuilder,)
    {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.shouldContinueLoop = false;
    }

    ngOnInit(): void {

        this.formTrySendMessageWhatsApp = this._formBuilder.group({
            message: ['', [Validators.required]], // Assuming no validation for ID
            phone: ['', [Validators.minLength(10), Validators.pattern(/^\d{8,}$/)]],
            prefix: ['39', [Validators.required]],

        });

        this.branchCode = localStorage.getItem("branchCode") ?? '';
        this._communicationStateManagerProvider
            .whatsAppConf$.subscribe(whatsAppConfDTO => {
            if(whatsAppConfDTO){
                console.log("whatsAppConfDTO: " + whatsAppConfDTO);
                this.wsConf = whatsAppConfDTO;
                if(this.wsConf.waApiState == WhatsAppConfigurationDTO.WaApiStateEnum.INSTANCECREATED){
                    this.startRequestLoop();
                }
            }
        });
    }


    startRequestLoop(): void {
        const durationInMinutes = 1;  // The loop duration in minutes
        const startTime = Date.now(); // Record the start time

        interval(3000)  // Emit every 2000 milliseconds (2 seconds)
            .pipe(
                takeWhile(() => this.shouldContinueLoop && ((Date.now() - startTime) < durationInMinutes * 30 * 1000)),
                switchMap(() => this.retrieveConf())
            )
            .subscribe(
                (response) => {
                    console.log('Response:', response);
                    if(response.waApiState == WaApiStateEnum.READY){
                        this._communicationStateManagerProvider.setCurrentWhatsAppConf(response);
                        this.shouldContinueLoop = false;
                    }
                },
                (error) => {
                    console.error('Error:', error);
                }
            );
    }

    retrieveConf()  {
        return this._whatsappControllerService.retrieveWaApiConfStatus(this.branchCode);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    gifUrlScanQr: string = 'assets/gif/scan-wa.gif';

    configureMessagingWhatsapp() {
        let timerInterval;
        Swal.fire({
            icon: "warning",
            title: "CONFIGURAZIONI IN CORSO",
            html: "Attendi, sto configurando il numero <b></b>",  // Placeholder for the dots animation
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,

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

                console.log('Configuration created: ' + value)
                this._communicationStateManagerProvider.setCurrentWhatsAppConf(value);

                Swal.fire({
                    icon: "success",
                    timer: 1600,
                    title: "Completato",
                    text: "Numero configurato con successo!",
                    showConfirmButton: true,
                });

                this.retrieveQR();
            },
            error: (err) => {
                // Handle the error and close Swal with an error message
                Swal.fire({
                    icon: "error",
                    title: "Errore",
                    text: err.textContent,
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
                    timer: 1500,
                    title: "Qr code trovato",
                    text: "Scannerizza il qr code per agganciare il cellulare",
                    showConfirmButton: true,
                });
            },
            error: (err) => {
                // Handle the error and close Swal with an error message
                Swal.fire({
                    icon: "error",
                    title: "Errore",
                    text: err.textContent,
                    showConfirmButton: true,
                });
            },
            complete: () => {
                // Clear any remaining intervals, if necessary
                clearInterval(timerInterval);
            }
        });
    }

    deleteInstance() {
        Swal.fire({
            title: "Eliminare configurazione What's App?",
            text: "Puoi effettuare una nuova configurazione in qualsiasi momento",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, cancella!"
        }).then((result) => {
            if (result.isConfirmed) {
                let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';
                this._whatsAppService.deleteConfWaApi(branchCodeRetrieved, 'response').subscribe(
                    value => {
                        this._communicationStateManagerProvider.resetConf();
                        console.log("deleted");
                    }
                );
                Swal.fire({
                    timer: 1600,
                    title: "Configurazione cancellata",
                    text: "Istanza cancellata con successo",
                    icon: "success"
                });
            }
        });
    }

    sendWhatsAppMessage() {

        let buildedNumber : string = this.formTrySendMessageWhatsApp.get('prefix').value
            + this.formTrySendMessageWhatsApp
                .get('phone').value;

        let message : string = this.formTrySendMessageWhatsApp.get('message').value;
        this._whatsappControllerService
            .sendMessage(this.wsConf.waApiInstanceId, message, buildedNumber,  'response')
            .subscribe(value => {

                if(value.status == 200) {

                    Swal.fire({
                        icon: "success",
                        timer: 1500,
                        title: "Ottimo 😎",
                        text: "Hai inviato il messaggio di prova correttamente",
                        showConfirmButton: true,
                    });

                }else{

                    Swal.fire({
                        icon: "error",
                        timer: 1500,
                        title: "Oh cazzo",
                        text: "Qualcosa non ha funzionato",
                        showConfirmButton: true,
                    });

                }
            });

        this.formTrySendMessageWhatsApp.reset();
        this.formTrySendMessageWhatsApp = this._formBuilder.group({
            message: ['', [Validators.required]], // Assuming no validation for ID
            phone: ['', [Validators.minLength(10), Validators.pattern(/^\d{8,}$/)]],
            prefix: ['39', [Validators.required]],

        });

    }
}

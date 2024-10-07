import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import Swal from "sweetalert2";
import {WhatsAppConfigurationControllerService, WhatsAppConfigurationDTO} from "../core/communication_service";

@Injectable({providedIn: 'root'})
export class CommunicationStateManagerProvider {

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private currentBranchWhatsAppConfiguration: BehaviorSubject<WhatsAppConfigurationDTO> = new BehaviorSubject(null);

    whatsAppConf$ = this.currentBranchWhatsAppConfiguration.asObservable();

    constructor(private _whatsappControllerService : WhatsAppConfigurationControllerService) {
    }

    retrieveData() {

        let branchCode = localStorage.getItem("branchCode") ?? '';
        console.log('Retrieve what\'s app configuration for branch with code ' + branchCode + '..')

        this._whatsappControllerService.retrieveWaApiConfStatus(branchCode, 'response').subscribe(whatsappconf => {
            if(whatsappconf.status == 200){

                this.currentBranchWhatsAppConfiguration.next(whatsappconf.body);

                console.log('Angelo Amatiiii: ' + whatsappconf.status);
                const toast = Swal.mixin({
                    background: '#3B3F5C',
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '3px',
                    customClass: {
                        container: 'sweet-alerts',
                        title: 'toast-title',
                    },
                });
                toast.fire({
                    icon: 'success',
                    title: 'Configurazione presente',
                    padding: '3px',

                });

            }else{
                console.log('Response: ' + whatsappconf.status);
                const toast = Swal.mixin({
                    background: '#3B3F5C',
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '3px',
                    customClass: {
                        container: 'sweet-alerts',
                        title: 'toast-title',
                    },
                });
                toast.fire({
                    icon: 'info',
                    title: 'Nessuna configurazione trovata',
                    padding: '3px',

                });
            }
        });

    }

    setCurrentWhatsAppConf(value: WhatsAppConfigurationDTO) {
        this.currentBranchWhatsAppConfiguration.next(value);
    }

    clearConf() {
        this.currentBranchWhatsAppConfiguration.next(null);
    }
}

import {Routes} from "@angular/router";
import {WhatsAppConfComponent} from "./whats-app-conf.component";
import {inject} from "@angular/core";
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";
import {CommunicationStateManagerProvider} from "../../../../state_manager/communication-state-manager-provider";

export default [
    {
        path     : '',
        component: WhatsAppConfComponent,
        resolve  : {
            data: () => inject(StateManagerProvider).getDashboardData(),
            dataWhatsappConf: () => inject(CommunicationStateManagerProvider).retrieveData(),
        },
    },
] as Routes;

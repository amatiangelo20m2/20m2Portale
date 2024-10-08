import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgFor, NgSwitch, NgSwitchCase} from "@angular/common";
import {SettingsAccountComponent} from "../../../pages/settings/account/account.component";
import {SettingsSecurityComponent} from "../../../pages/settings/security/security.component";
import {SettingsPlanBillingComponent} from "../../../pages/settings/plan-billing/plan-billing.component";
import {SettingsNotificationsComponent} from "../../../pages/settings/notifications/notifications.component";
import {SettingsTeamComponent} from "../../../pages/settings/team/team.component";
import {Subject, takeUntil} from "rxjs";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {WhatsappsettingsComponent} from "./whatsappsettings/whatsappsettings.component";
import {WhatsAppConfigurationControllerService} from "../../../../core/communication_service";
import {CommunicationStateManagerProvider} from "../../../../state_manager/communication-state-manager-provider";
import Swal from "sweetalert2";
import {MessagingComponent} from "./messaging/messaging.component";

@Component({
    selector       : 'whatsappconfig',
    templateUrl    : 'whats-app-conf.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports: [MatSidenavModule, MatButtonModule, MatIconModule, NgFor, NgClass, NgSwitch, NgSwitchCase, SettingsAccountComponent, SettingsSecurityComponent, SettingsPlanBillingComponent, SettingsNotificationsComponent, SettingsTeamComponent, WhatsappsettingsComponent, MessagingComponent],
})
export class WhatsAppConfComponent {
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'wsconf';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }
    ngOnInit(): void
    {
        // Setup available panels
        this.panels = [
            {
                id         : 'wsconf',
                icon       : 'heroicons_outline:whatsapp-colored',
                title      : 'Configura What\'s App',
                description: 'Configura il tuo numero per utilizzare i servizi di mesaggistica',
            },
            {
                id         : 'massivemsg',
                icon       : 'heroicons_outline:chat-bubble-left-right',
                title      : 'Invia messaggi',
                description: 'Invia messaggi massivi ai tuoi clienti',
            }
        ];


        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, inject,
    OnDestroy,
    OnInit, signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Subject, takeUntil} from "rxjs";
import {DataproviderService} from "../dataprovider.service";
import {NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {User} from "../../../core/user/user.types";
import {BranchResponseEntity} from "../../../core/dashboard";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {FuseMediaWatcherService} from "../../../../@fuse/services/media-watcher";
import {SettingsPlanBillingComponent} from "../../pages/settings/plan-billing/plan-billing.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ApexOptions, NgApexchartsModule} from "ng-apexcharts";
import {MatMenuModule} from "@angular/material/menu";

export interface Fruit {
    name: string;
}

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports: [MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        NgFor,
        NgClass,
        NgSwitch,
        NgSwitchCase,
        SettingsPlanBillingComponent,
        NgIf,
        MatExpansionModule,
        MatDatepickerModule,
        MatCardModule,
        MatInputModule, FormsModule, MatDialogModule, MatChipsModule, MatButtonToggleModule, NgApexchartsModule, MatMenuModule],
})
export class DashboardComponent implements OnInit, OnDestroy {

    data: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @ViewChild('drawer') drawer: MatDrawer;

    // data: any;
    user : User;
    currentBranch : BranchResponseEntity;

    currentBranchList : BranchResponseEntity[];
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'branchsetting';

    /**
     * Constructor
     */
    constructor(private _dataProvideService: DataproviderService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _fuseMediaWatcherService: FuseMediaWatcherService,) {
    }

    readonly panelOpenState = signal(false);
    ngOnInit(): void {
        this.panels = [
            {
                id         : 'branchsetting',
                icon       : 'mat_outline:app_settings_alt',
                title      : 'Configura Attività',
                description: 'Aperture - Form - Strategia',
            },
            {
                id         : 'booking',
                icon       : 'heroicons_outline:calendar-days',
                title      : 'Prenotazioni',
                description: 'Booking',
            },
            {
                id         : 'advertising',
                icon       : 'heroicons_outline:device-phone-mobile',
                title      : 'Campagne Pubblicitarie',
                description: 'Advertising Campaigns',
            },
            {
                id         : 'catering',
                icon       : 'mat_outline:local_bar',
                title      : 'Catering ed Eventi',
                description: 'Catering and Events',
            },
            {
                id         : 'team',
                icon       : 'heroicons_outline:user-group',
                title      : 'Team',
                description: 'Manage your existing team and change roles/permissions',
            },
        ];

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

        this.user = this._dataProvideService.user;

        this._dataProvideService.branches$.subscribe((branches) => {
            this.currentBranchList = branches;
        });

        this._dataProvideService.branch$.subscribe((branch) => {
           this.currentBranch = branch;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

    goToPanel(panel: string): void {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }
}
export interface DialogData {
    animal: string;
    name: string;
}

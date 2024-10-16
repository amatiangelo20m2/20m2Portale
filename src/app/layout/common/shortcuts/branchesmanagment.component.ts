import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {Router, RouterLink} from '@angular/router';
import {catchError, Subject, throwError} from 'rxjs';
import {StateManagerProvider} from "../../../state_manager/state-manager-provider.service";
import {User} from "../../../core/user/user.types";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {BranchCreationEntity, BranchResponseEntity, BranchControllerService} from "../../../core/dashboard";
import Swal from "sweetalert2";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import {CommunicationStateManagerProvider} from "../../../state_manager/communication-state-manager-provider";

@Component({
    selector       : 'branches-managment',
    templateUrl    : './branchesmanagment.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'shortcuts',
    standalone     : true,
    imports: [MatButtonModule,
        MatIconModule,
        NgIf,
        MatTooltipModule,
        NgFor,
        NgClass,
        NgTemplateOutlet,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatSnackBarModule, MatOptionModule, MatSelectModule, MatBadgeModule],
})
export class BranchesmanagmentComponent implements OnInit, OnDestroy
{
    @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
    @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

    @Input() tooltip: string;

    mode: 'view' | 'modify' | 'add' | 'edit' = 'view';
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    branchEntity : BranchCreationEntity;
    branchForm: UntypedFormGroup;

    currentBranch : BranchResponseEntity;
    currentBranchList : BranchResponseEntity[];
    user : User;

    branchTypes: BranchResponseEntity.TypeEnum[] = Object.values(BranchResponseEntity.TypeEnum);

    constructor(
        private router: Router,
        private _formBuilder: UntypedFormBuilder,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _stateManagerProvider : StateManagerProvider,
        private _branchControllerService : BranchControllerService,
        private _communicationStateManager : CommunicationStateManagerProvider,
        private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.user = this._stateManagerProvider.user;

        this._stateManagerProvider.branches$.subscribe((branches) => {
            this.currentBranchList = branches;
            if(this.currentBranchList?.length == 0){
                this.openPanel();
            }
        });

        this._stateManagerProvider.branch$.subscribe((branch) => {
            this.currentBranch = branch;
        });

        this.branchForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            address : ['', Validators.required],
            city: ['', Validators.required],
            cap: ['', Validators.required],
            type: [BranchResponseEntity.TypeEnum.RISTORANTE]
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if ( this._overlayRef ) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the shortcuts panel
     */
    openPanel(): void {
        if ( !this._shortcutsPanel || !this._shortcutsOrigin ) {
            return;
        }
        this.mode = 'view';

        if ( !this._overlayRef ) {
            this._createOverlay();
        }

        this._overlayRef.attach(new TemplatePortal(this._shortcutsPanel, this._viewContainerRef));
    }

    /**
     * Close the shortcuts panel
     */
    closePanel(): void {
        this._overlayRef.detach();
    }

    /**
     * Change the mode
     */
    changeMode(mode: 'view' | 'modify' | 'add' | 'edit'): void
    {
        // Change the mode
        this.mode = mode;
    }

    /**
     * Prepare for a new shortcut
     */
    newBranch(): void {
        // Reset the form
        this.branchForm.reset();

        // Enter the add mode
        this.mode = 'add';
    }

    /**
     * Edit a shortcut
     */
    editBranch(branch: BranchResponseEntity): void {
        // Reset the form with the shortcut
        this.branchForm.reset(branch);

        // Enter the edit mode
        this.mode = 'edit';
    }

    /**
     * Save shortcut
     */
    save(): void {

        if ( this.branchForm.invalid ) {
            return;
        }

        this.branchForm.disable();

        console.log("this.branchForm.get('type').value," + this.branchForm.get('type').value)

        this.branchEntity = {
            name: this.branchForm.get('name').value,
            address: this.branchForm.get('address').value,
            email: this.branchForm.get('email').value,
            phoneNumber: '',
            city: this.branchForm.get('city').value,
            cap: this.branchForm.get('cap').value,
            vat: '',
            type: this.branchForm.get('type').value ?? 'RESTAURANT',
            userCode: this.user.userCode,
        }

        this._branchControllerService.save(this.branchEntity).pipe(

            catchError((error) => {
                this._snackBar.open('error: ' + error.statusCode, 'Undo', {
                    duration: 3000
                });
                return throwError(error);
            })
        ).subscribe(
            (branchResponseEntity) => {
                this._snackBar.open('Attività creata con successo', 'Undo', {
                    duration: 3000,
                });

                this._stateManagerProvider.addBranch(branchResponseEntity);

                this.closePanel();
            }
        );
        this.branchForm.enable();
        this.branchForm.reset();
        this.mode = 'view';
    }

    /**
     * Delete shortcut
     */
    delete(): void {
        const shortcut = this.branchForm.value;

        // Delete
        // this._shortcutsService.delete(shortcut.id).subscribe();

        // Go back the modify mode
        this.mode = 'modify';
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._shortcutsOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX : 'start',
                        originY : 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX : 'start',
                        originY : 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX : 'end',
                        originY : 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX : 'end',
                        originY : 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    selectBranch(branch: BranchResponseEntity) {

        this._stateManagerProvider.selectBranch(branch);
        this._communicationStateManager.resetConf();
        this.closePanel();

        this._stateManagerProvider.showToast('Ora stai lavorando su ' + branch.name, 'success');
        this.router.navigate(['/']).then(r => true);


    }
}

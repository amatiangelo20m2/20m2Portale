import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {catchError, Subject, throwError} from "rxjs";
import {BranchControllerService, BranchCreationEntity, BranchResponseEntity} from "../../../../../../core/dashboard";
import {User} from "../../../../../../core/user/user.types";
import {Router} from "@angular/router";
import {StateManagerProvider} from "../../../../../../state_manager/state-manager-provider.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TemplatePortal} from "@angular/cdk/portal";
import {FormControllerService, FormDTO} from "../../../../../../core/restaurant_service";
import FormTypeEnum = FormDTO.FormTypeEnum;
import {RestaurantStateManagerProvider} from "../../../../../../state_manager/restaurant-state-manager";
import FormStatusEnum = FormDTO.FormStatusEnum;

@Component({
  selector: 'app-create-form-component',
  templateUrl: './create-form-component.component.html',
  imports: [
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    ReactiveFormsModule
  ],
  standalone: true
})
export class CreateFormComponentComponent implements OnInit, OnDestroy{

  @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
  @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

  @Input() tooltip: string;


  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  formEntity : FormDTO;
  formForm: UntypedFormGroup;


  formType: FormDTO.FormTypeEnum[] = Object.values(FormDTO.FormTypeEnum);
  branchCode: string;
  branchName: string;
  branchAddress: string;

  constructor(
      private router: Router,
      private _formBuilder: UntypedFormBuilder,
      private _overlay: Overlay,
      private _viewContainerRef: ViewContainerRef,
      private _stateManagerProvider : StateManagerProvider,
      private _restaurantStateManager : RestaurantStateManagerProvider,
      private _formControllerService : FormControllerService,
      private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {


    this._stateManagerProvider.branch$.subscribe((branch) => {
      if(branch != null)
        this.branchCode = branch.branchCode;
        this.branchName = branch.name;
        this.branchAddress = branch.address;
    });

    this.formForm = this._formBuilder.group({
      formName : ['', [Validators.required]],
      formType: ['PRENOTAZIONE', [Validators.required]],
      redirectPage: [''],
      formId: [0],
      formCode: [''],
      creationDate: [null],
      branchCode: [this.branchCode],
      formStatus: [FormStatusEnum.ATTIVO],
      tag: [Array<string>],
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

  save(): void {

    if ( this.formForm.invalid ) {
      return;
    }

    this.formForm.disable();
    let formEntity: FormDTO = {
      formId: 0,
      formType: this.formForm.get('formType').value,
      formName: this.formForm.get('formName').value,
      redirectPage: this.formForm.get('redirectPage').value,
      branchAddress: this.branchAddress,
      branchName: this.branchName,
      formCode: '',
      branchCode: this.branchCode,
      formStatus: FormStatusEnum.ATTIVO,
      cutterTimeForRanges: 0,
    };


    this._formControllerService.createForm(formEntity).pipe(

        catchError((error) => {
          this._snackBar.open('error: ' + error.statusCode, 'Undo', {
            duration: 3000
          });
          return throwError(error);
        })
    ).subscribe(
        (branchResponseEntity) => {
          this._stateManagerProvider.showToast('Form creato con successo', 'success');
          this._restaurantStateManager.retrieveFormByBranchCode();

          this.closePanel();
        }
    );
    this.formForm.enable();
    this.formForm.reset();
    this.ngOnInit();
  }

  /**
   * Delete shortcut
   */
  close(): void {
    this._overlayRef.detach();
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
  private _createOverlay(): void {
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

}

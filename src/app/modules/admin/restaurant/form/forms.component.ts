import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {StateManagerProvider} from "../../../../state_manager/state-manager-provider.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TemplatePortal} from "@angular/cdk/portal";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import FormTypeEnum = FormDTO.FormTypeEnum;
import {FormControllerService, FormDTO} from "../../../../core/restaurant_service";
import FormStatusEnum = FormDTO.FormStatusEnum;
import {catchError, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormlistComponent} from "./formlist/formlist.component";
import {RestaurantStateManagerProvider} from "../../../../state_manager/restaurant-state-manager";

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    imports: [
        NgIf,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatSelectModule,
        NgForOf,
        FormlistComponent
    ],
    standalone: true
})
export class FormsComponent implements OnInit, OnDestroy{

    @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
    @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

    @Input() tooltip: string;

    private _overlayRef: OverlayRef;
    formForm: UntypedFormGroup;

    forms : FormDTO[] = [];
    formTypes: FormTypeEnum[] = Object.values(FormTypeEnum);



    private currentBranchCode: string;

    constructor(private _stateManagerProvider : StateManagerProvider,
                private _restaurantStateManagerProvider : RestaurantStateManagerProvider,
                private _formController : FormControllerService,
                private _overlay: Overlay,
                private _formBuilder: UntypedFormBuilder,
                private _viewContainerRef: ViewContainerRef,
                private _snackBar: MatSnackBar) {
    }

    ngOnDestroy(): void {

        if ( this._overlayRef ) {
            this._overlayRef.dispose();
        }
    }

    ngOnInit(): void {

        this._stateManagerProvider.branch$.subscribe(value => {

            value.branchCode;
            let branchCodeRetrieved = localStorage.getItem("branchCode") ?? '';

            if(value.branchCode == branchCodeRetrieved){
                this.currentBranchCode = value.branchCode;
            }

        });

        this._restaurantStateManagerProvider.formDtos$.subscribe({
            next: (value) => {
                this.forms = value;
            },
            error: (err) => {
                console.error('Error retrieving forms: ', err);
            }
        });

        this.formForm = this._formBuilder.group({
            name : ['', [Validators.required]],
            redirectpage : [''],
            type: [this.formTypes[0], Validators.required]
        });

    }

    openCreateFormPanel() {
        if ( !this._shortcutsPanel || !this._shortcutsOrigin ) {
            return;
        }

        if ( !this._overlayRef ) {
            this._createOverlay();
        }

        this._overlayRef.attach(new TemplatePortal(this._shortcutsPanel, this._viewContainerRef));
    }

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

    createEntityForm : FormDTO;
    saveForm() {
        if ( this.formForm.invalid ) {
            return;
        }

        this.formForm.disable();

        let formEntity: FormDTO = {
            formId: 0,
            formType: this.formForm.get('type').value,
            formName: this.formForm.get('name').value,
            redirectPage: this.formForm.get('redirectpage').value,
            formCode: '',
            branchCode: this.currentBranchCode,
            formStatus: FormStatusEnum.ATTIVO,
            tag: [],
        };

        console.log(formEntity);

        this._formController.createForm(formEntity).pipe(

            catchError((error) => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000
                });
                this.closePanel();
                return throwError(error);
            })
        ).subscribe(
            (formDTO) => {
                this._snackBar.open('Form creato con successo', 'Undo', {
                    duration: 3000,
                });

                this._restaurantStateManagerProvider.retrieveFormByBranchCode();

                this.closePanel();
            }
        );
        this.formForm.enable();
        this.formForm.reset();
    }

    closePanel(): void {
        this._overlayRef.detach();
    }
}
